const fs = require("fs");
const constants = require("../test/util/Constants");
const GetAccounts = require('./util/GetAccounts');
const GetGasCost = require('./util/GetGasCost');
const traitsJSON = "data/avastars-dashboard-genes-export.json";
const logfile = "data/CreateTraitsLog.txt";
const AvastarTeleporter = artifacts.require("contracts/AvastarTeleporter.sol");
const div = "-------------------------------------------------------------------------------------------";

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
        ? `Id: ${this.id}\tGene: ${this.trait.gene}\tVariation: ${this.trait.variation}\tArt Size: ${this.artSize}\tSections: ${this.totalSections}\tGas Spent: ${this.totalGasSpent}`
        : "";
};

let total_gas = 0;
let costliest_trait = new ProcessedTrait();
const bumpGas = gas => gas + Math.round((gas * .01));
const logIt = (log, value) => { console.log(value); log.write(`${value}\n`) };

module.exports = async function(done) {

    console.log('Creating log file...');
    const log = fs.createWriteStream(logfile);

    console.log('Processing raw database dump...');
    const traits = getTraits(traitsJSON);
    console.log(`${traits.length} traits processed.`);

    // Get accounts using default web3 provided by `truffle exec`
    console.log('Fetching accounts...');
    const accounts = await GetAccounts(web3);

    // Create teleporter contract, verify, unpause
    let teleporter = await AvastarTeleporter.deployed();
    let isTeleporter = await teleporter.isAvastarTeleporter();
    if (isTeleporter) {
        console.log('Adding traits to contract...');
        console.log('----------------------------');
        logIt(log, div);
        logIt(log, `Max Gas/Tx: ${constants.MAX_GAS}\tMax Initial Section: ${constants.MAX_ART_SIZE}\tMax Extension Section: ${constants.MAX_EXT_SIZE}`);
        logIt(log, div);
        try {
            // Process all the traits
            for (const trait of traits) {

                let processing = new ProcessedTrait(trait, constants.MAX_ART_SIZE, constants.MAX_EXT_SIZE);

                if (processing.totalSections === 1) {

                    // Create the trait in one go
                    await createTrait(teleporter, processing, accounts, log);

                } else if (processing.totalSections > 1){

                    // Create the trait with the initial section
                    await createTrait(teleporter, processing, accounts, log);

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

            // Report the summary
            let gas_expenditure = await GetGasCost(web3, total_gas);
            logIt(log, div);
            logIt(log, `Costliest Trait:\n${costliest_trait.toString()}`);
            logIt(log, div);
            logIt(log, `Gas Expenditure:\n${gas_expenditure}`);
            logIt(log, div);

        } catch (e) {
            logIt(log, e.message);
        }

        done();

    } else {
        console.log('Teleporter not deployed');
        done();
    }
};

async function createTrait(teleporter, processing, accounts, log){
    let {generation, gender, gene, name, series, variation} = processing.trait;
    let {initial} = processing;
    try {
        let gas = await teleporter.createTrait.estimateGas(generation, series, gender, gene, variation, name, initial, {
            from: accounts.sysAdmin,
            gas: constants.MAX_GAS
        });
        let plusALittle = (bumpGas(gas) > constants.MAX_GAS)
            ? constants.MAX_GAS
            : bumpGas(gas);

        let traitId = await teleporter.createTrait.call(generation, series, gender, gene, variation, name, initial, {
            from: accounts.sysAdmin,
            gas: plusALittle
        });
        let result = await teleporter.createTrait(generation, series, gender, gene, variation, name, initial, {
            from: accounts.sysAdmin,
            gas: plusALittle
        });

        let gasUsed = result.receipt.gasUsed;
        processing.id = traitId;
        processing.totalGasSpent = gasUsed;

    } catch (e) {
        let err = e.toString() + '\n';
        logIt(log, err);
    }
}

async function extendTrait(teleporter, processing, piece, accounts, log){
    try {
        let gas = await teleporter.extendTraitArt.estimateGas(processing.id, piece, {
            from: accounts.sysAdmin,
            gas: constants.MAX_GAS
        });
        let plusALittle = (bumpGas(gas) > constants.MAX_GAS)
            ? constants.MAX_GAS
            : bumpGas(gas);

        let result = await teleporter.extendTraitArt(processing.id, piece,  {
            from: accounts.sysAdmin,
            gas: plusALittle
        });

        let gasUsed = result.receipt.gasUsed;
        processing.totalGasSpent += gasUsed;

    } catch (e) {
        let err = e.toString() + '\n';
        logIt(log, `${err} ${processing.toString()}`);
    }
}

// Process the raw trait dump from the database, returning a single array
// of enum-adjusted objects, ready to be added to the contract
function getTraits(file) {
    const lookupGeneEnum = gene => constants.GENE[gene.toUpperCase().replace(' ','_')];
    const addGeneration = trait => trait.generation = constants.GENERATION.ONE;
    const adjustSeries = trait => trait.series = trait.series.map(item => item - 1);
    const adjustGender = trait => trait.gender = constants.GENDER[trait.gender.toUpperCase()];
    const adjustGene = trait => trait.gene = lookupGeneEnum(trait.gene);

    let retVal;
    try {
        let json = fs.readFileSync(file, "utf8");
        let genes = JSON.parse(json);

        let orderedKeys = [
            'Background',
            'Skin Tone',
            'Hair Color',
            'Eye Color',
            'Ears',
            'Face',
            'Nose',
            'Mouth',
            'Facial Feature',
            'Eyes',
            'Hair Style'
        ];

        retVal = orderedKeys.map( key => {
            let traits = [];
            traits.push(genes[key]
                .filter(trait => !!trait)
                .map(trait => {
                    addGeneration(trait);
                    adjustSeries(trait);
                    adjustGender(trait);
                    adjustGene(trait);
                    return trait;
                }));
            return traits.flat();
        } );
    } catch (e) {
        console.log('woopsy: ');
        console.log(e.message);
        process.exit();
    }
    return retVal.flat();
}