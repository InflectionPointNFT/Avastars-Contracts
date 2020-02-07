const fs = require("fs");

const NETWORK = 'ropsten';
const logfile = `data/verify-traits.${NETWORK}.txt`;

const constants = require("../util/Constants");
const AccountManager = require('../util/AccountManager');
const traitsJSON = "data/create-traits.json";
const AvastarTeleporter = artifacts.require("contracts/AvastarTeleporter.sol");
const div = "--------------------------------------------------------";
const orderedKeys = Object.keys(constants.GENE).map(
    key => key
        .toLowerCase()
        .replace('_',' ')
        .replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
);

function ProcessedTrait(trait){
    this.trait = trait;
    this.id = "-";
    this.verified = false;
}
ProcessedTrait.prototype.toString = function() {
    return (this.trait && this.trait.svg)
        ? `Id: ${this.getId()}\tGene: ${this.getGene()}\tVariation: ${this.getVariation()}\tVerified: ${this.getVerified()}`
        : "";
};
ProcessedTrait.prototype.getId = function () { return this.id?String(this.id).padStart(3):""; };
ProcessedTrait.prototype.getGene = function () { return (this.trait)?String(this.trait.gene).padStart(2):""; };
ProcessedTrait.prototype.getVariation = function () { return (this.trait)?String(this.trait.variation).padStart(2):""; };
ProcessedTrait.prototype.getVerified = function () { return this.verified?"[+]".padStart(3):"[-]".padStart(3); };

const logIt = (log, value) => { console.log(value); log.write(`${value}\n`) };

let verified_traits = 0;

module.exports = async function(done) {

    console.log('Environment / network...');
    const env = AccountManager.getEnvByNetwork(NETWORK);
    console.log(env, NETWORK);

    console.log('Fetching accounts...');
    const accounts = AccountManager.getAccounts(env);
    console.log(accounts);
    //process.exit(); // SAFETY CATCH: Comment out to run


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
        console.log('Reading traits from contract...');

        // Are we starting fresh or restarting?
        if (!lastTrait) {
            logIt(log, div);
            logIt(log, `> Verifying Deployed Trait Art`);
            logIt(log, div);
        } else {
            logIt(log, "");
        }

        try {
            // Process the traits
            for (const trait of traits) {

                let processing = new ProcessedTrait(trait);

                if (!shouldSkip(processing, lastTrait)) {

                    // Verify the trait
                    await verifyTrait(teleporter, processing, accounts, log);

                    logIt(log, processing.toString());

                }
            }

            // Report the summary
            logIt(log, div);
            logIt(log, `> Verified Traits\n${verified_traits}`);
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

async function verifyTrait(teleporter, processing, accounts, log){
    let {generation, gene, variation, svg} = processing.trait;
    try {

        const traitId = await teleporter.getTraitIdByGenerationGeneAndVariation(generation, gene, variation, {
            from: accounts.admins[0]
        });

        const art = await teleporter.getTraitArtById(traitId, {
            from: accounts.admins[0]
        });

        processing.verified = (art === svg);
        processing.id = traitId;

    } catch (e) {
        let err = e.toString() + '\n';
        logIt(log, err);
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
    let lastVerifiedTrait;

    const convertObjToProcessed = obj => {
        let processed = new ProcessedTrait();
        processed.id = Number(obj.Id.trim());
        processed.verified = Number(obj.Verified.trim());
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
        let obj = {};
        pairs.forEach(pair => obj[pair.split(":")[0]] = pair.split(":")[1]);
        lastVerifiedTrait = convertObjToProcessed(obj);

        // accumulate verified trait count
        lines.forEach( line => {
            obj = {};
            pairs = line.split("\t");
            pairs.forEach(pair => obj[pair.split(":")[0]] = pair.split(":")[1]);
            verified_traits += (obj.Verified) ? 1 : 0;

        });

    } catch (e) {
        console.log(e.message);
    }
    return lastVerifiedTrait;
}