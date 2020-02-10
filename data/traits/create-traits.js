//--------------------------{SET ME FIRST}---------------------
const NETWORK = 'development';
//const NETWORK = 'ropsten';
//const NETWORK = 'rinkeby';
//const NETWORK = 'mainnet';
//--------------------------{SET ME FIRST}---------------------

const logfile = `data/create-traits.${NETWORK}.txt`;
const fs = require("fs");
const constants = require("../../util/Constants");
const AccountManager = require('../../util/AccountManager');
const GetGasCost = require('../../util/GetGasCost');
const traitsJSON = "data/create-traits.json";
const AvastarTeleporter = artifacts.require("contracts/AvastarTeleporter.sol");
const div = "-------------------------------------------------------------------------------------";
const orderedKeys = Object.keys(constants.GENE).map(
    key => key
        .toLowerCase()
        .replace('_',' ')
        .replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
);

// Bizarrely, even though this can be included as
// Cordwood.js over in test/TraitFactoryTest.js,
// It will not work via require in a command script
if (!String.prototype.cordwood) {
    String.prototype.cordwood = function(cordlen) {
        if (cordlen === undefined || cordlen > this.length) {
            cordlen = this.length;
        }
        let yardstick = new RegExp(`.{${cordlen}}`, 'g');
        let pieces = this.match(yardstick);
        let accumulated = (pieces.length * cordlen);
        let modulo = this.length % accumulated;
        if (modulo) pieces.push(this.slice(accumulated));
        return pieces;
    };
}

function ProcessedTrait(trait, max_art, max_ext){
    this.trait = trait;
    this.id = "-";
    this.totalGasSpent = 0;
    this.totalSections = 0;
    this.artSize = (!!trait && !!trait.svg) ? trait.svg.length : 0;
    if (this.artSize > max_art) {
        // Split the art into pieces
        this.initial = this.trait.svg.substring(0, max_art);
        let remainder = this.trait.svg.substring(max_art);
        this.pieces = remainder.cordwood(max_ext);
        this.totalSections = this.pieces.length + 1;
    } else if (this.artSize > 0) {
        // Set the initial section to the entire art
        this.initial = this.trait.svg;
        this.totalSections = 1;
    }
}
ProcessedTrait.prototype.toString = function() {
    return (this.trait && this.trait.svg)
        ? `Id: ${this.getId()}\tGene: ${this.getGene()}\tVariation: ${this.getVariation()}\tSVG: ${this.getArtSize()} bytes\tSections: ${this.getTotalSections()}\tGas: ${this.getGasSpent()}`
        : "";
};
ProcessedTrait.prototype.getId = function () { return this.id?String(this.id).padStart(3):""; };
ProcessedTrait.prototype.getGene = function () { return (this.trait)?String(this.trait.gene).padStart(2):""; };
ProcessedTrait.prototype.getVariation = function () { return (this.trait)?String(this.trait.variation).padStart(2):""; };
ProcessedTrait.prototype.getArtSize = function () { return (this.artSize)?String(this.artSize).padStart(5):""; };
ProcessedTrait.prototype.getTotalSections = function () { return (this.totalSections)?String(this.totalSections).padStart(2):""; };
ProcessedTrait.prototype.getGasSpent = function () { return (this.totalGasSpent)?String(this.totalGasSpent).padStart(8):""; };

let total_gas = 0;
let costliest_trait = new ProcessedTrait();
const bumpGas = gas => gas + Math.round((gas * .02));
const logIt = (log, value) => { console.log(value); log.write(`${value}\n`) };

module.exports = async function(done) {

    console.log('Environment / network...');
    const env = AccountManager.getEnvByNetwork(NETWORK);
    console.log(env, NETWORK);

    console.log('Fetching accounts...');
    const accounts = AccountManager.getAccounts(env);
    console.log(accounts);

    // ------------------------{SAFETY CATCH: Comment out to run}------------------
    process.exit();
    // ------------------------{SAFETY CATCH: Comment out to run}------------------


    // Attempt to read logfile, then decide whether to write or append
    let lastTrait = fs.existsSync(logfile) ? readLog(logfile) : null;
    let log, options;
    if (lastTrait && lastTrait.trait.gene && lastTrait.trait.variation) {
        console.log('Resume current log from last successful trait.');
        options = {flags:'a'};
    } else {
        console.log('Start from scratch with new log.');
        options = {flags:'w'};
    }
    log = fs.createWriteStream(logfile, options);

    console.log('Processing raw database dump...');
    const traits = getTraits(traitsJSON);
    console.log(`${traits.length} traits processed.`);

    // Function to determine if we should skip processing a trait
    const shouldSkip = (processing, lastTrait) => (lastTrait &&
        (
            processing.trait.gene < lastTrait.trait.gene ||
            (processing.trait.gene === lastTrait.trait.gene && processing.trait.variation <= lastTrait.trait.variation)
        )
    );

    // Create teleporter contract, verify, unpause
    let teleporter = await AvastarTeleporter.deployed();
    let isTeleporter = await teleporter.isAvastarTeleporter();
    if (isTeleporter) {
        console.log('Adding traits to contract...');

        // Are we starting fresh or restarting?
        if (!lastTrait) {
            logIt(log, div);
            logIt(log, `> Operational Maximums:`);
            logIt(log, `Gas/Tx: ${constants.MAX_GAS} units\tInitial Section: ${constants.MAX_ART_SIZE} bytes\tExtension Section: ${constants.MAX_EXT_SIZE} bytes`);
            logIt(log, div);
        } else {
            logIt(log, "");
        }

        try {
            // Process the traits
            for (const trait of traits) {

                let processing = new ProcessedTrait(trait, constants.MAX_ART_SIZE, constants.MAX_EXT_SIZE);

                if (!shouldSkip(processing, lastTrait)) {

                    if (processing.totalSections === 1) {

                        // Create the trait in one go
                        await createTrait(teleporter, processing, accounts, log, lastTrait);

                    } else if (processing.totalSections > 1) {

                        // Create the trait with the initial section
                        await createTrait(teleporter, processing, accounts, log, lastTrait);

                        // Extend the artwork with all the remaining pieces
                        for (let piece of processing.pieces) {
                            await extendTrait(teleporter, processing, piece, accounts, log);
                        }

                    }

                    logIt(log, processing.toString());

                    if (processing.totalGasSpent > 0) {
                        total_gas += processing.totalGasSpent;
                        if (processing.totalGasSpent > costliest_trait.totalGasSpent) costliest_trait = processing;
                    }
                }
            }

            // Report the summary
            let gas_expenditure = await GetGasCost(web3, total_gas);
            logIt(log, div);
            logIt(log, `> Costliest Trait\n${costliest_trait.toString()}`);
            logIt(log, div);
            logIt(log, `> Total Expenditure\n${gas_expenditure}`);
            logIt(log, div);

        } catch (e) {
            logIt(log, e.message);
            process.exit();
        }

        done();

    } else {
        console.log('Teleporter not deployed');
        done();
    }
};

async function createTrait(teleporter, processing, accounts, log, lastTrait){
    let {generation, gender, gene, name, series, variation, rarity} = processing.trait;
    let {initial} = processing;
    try {
        let gas = await teleporter.createTrait.estimateGas(generation, series, gender, gene, rarity, variation, name, initial, {
            from: accounts.admins[0],
            gas: constants.MAX_GAS
        });
        let plusALittle = (bumpGas(gas) > constants.MAX_GAS)
            ? constants.MAX_GAS
            : bumpGas(gas);

        let traitId = await teleporter.createTrait.call(generation, series, gender, gene, rarity, variation, name, initial, {
            from: accounts.admins[0],
            gas: plusALittle
        });
        let result = await teleporter.createTrait(generation, series, gender, gene, rarity, variation, name, initial, {
            from: accounts.admins[0],
            gas: plusALittle
        });

        let gasUsed = result.receipt.gasUsed;
        processing.id = traitId;
        processing.totalGasSpent = gasUsed;

    } catch (e) {
        let err = e.toString() + '\n';
        logIt(log, err);
        process.exit();
    }
}

async function extendTrait(teleporter, processing, piece, accounts, log){
    try {
        let gas = await teleporter.extendTraitArt.estimateGas(processing.id, piece, {
            from: accounts.admins[0],
            gas: constants.MAX_GAS
        });
        let plusALittle = (bumpGas(gas) > constants.MAX_GAS)
            ? constants.MAX_GAS
            : bumpGas(gas);

        let result = await teleporter.extendTraitArt(processing.id, piece,  {
            from: accounts.admins[0],
            gas: plusALittle
        });

        let gasUsed = result.receipt.gasUsed;
        processing.totalGasSpent += gasUsed;

    } catch (e) {
        let err = e.toString() + '\n';
        logIt(log, `${err} ${processing.toString()}`);
        process.exit();
    }
}

// Process the raw trait dump from the database, returning a single array
// of enum-adjusted objects, ready to be added to the contract
function getTraits(file) {
    const lookupGeneEnum = gene => constants.GENE[gene.toUpperCase().replace(' ','_')];
    const addGeneration = trait => trait.generation = constants.GENERATION.ONE;
    const adjustSeries = trait => trait.series = trait.series.map(item => item - 1);
    const adjustGender = trait => trait.gender = constants.GENDER[trait.gender.toUpperCase()];
    const adjustRarity = trait => trait.rarity = constants.RARITY[trait.rarity.toUpperCase()];
    const adjustGene = trait => trait.gene = lookupGeneEnum(trait.gene);

    let retVal;
    try {
        const json = fs.readFileSync(file, "utf8");
        const genes = JSON.parse(json);

        retVal = orderedKeys.map( key => {
            let traits = [];
            if (!!genes[key]) {
                traits.push(genes[key]
                    .filter(trait => !!trait)
                    .map(trait => {
                        addGeneration(trait);
                        adjustSeries(trait);
                        adjustGender(trait);
                        adjustRarity(trait);
                        adjustGene(trait);
                        return trait;
                    }));
            }
            return traits.flat();
        } );
    } catch (e) {
        console.log('woopsy: ');
        console.log(e.message);
        process.exit();
    }
    return retVal.flat();
}

// Read the previous log file and find the last successful trait
function readLog(file) {
    let lastSuccessfulTrait;

    const convertObjToProcessed = obj => {
        let processed = new ProcessedTrait();
        processed.id = Number(obj.Id.trim());
        processed.totalGasSpent = Number(obj.Gas.trim());
        processed.totalSections = Number(obj.Sections.trim());
        processed.trait = {
            gene: Number(obj.Gene.trim()),
            variation: Number(obj.Variation.trim())
        };
        return processed;
    };

    try {
        const infile = fs.readFileSync(file, "utf8");
        let lines = infile.split("\n");

        // get last line data
        let lastLine = lines[lines.length-1];
        let pairs = lastLine.split("\t");
        let gas, obj = {};
        pairs.forEach(pair => obj[pair.split(":")[0]] = pair.split(":")[1]);
        lastSuccessfulTrait = convertObjToProcessed(obj);

        // accumulate gas and find costliest trait
        lines.forEach( line => {
            obj = {};
            pairs = line.split("\t");
            pairs.forEach(pair => obj[pair.split(":")[0]] = pair.split(":")[1]);
            gas = (!!obj.Gas) ? Number(obj.Gas.trim()) : 0;
            total_gas += gas;

            if (gas > costliest_trait.totalGasSpent) {
                costliest_trait = convertObjToProcessed(obj);
            }

        });

    } catch (e) {
        console.log(e.message);
    }
    return lastSuccessfulTrait;
}