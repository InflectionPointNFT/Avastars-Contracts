const fs = require("fs");
const constants = require("../test/util/Constants");
const exceptions = require("../test/util/Exceptions");
const GetAccounts = require('./util/GetAccounts');
const traitsJSON = "data/avastars-dashboard-genes-export.json";
const logfile = "data/CreateTraitsLog.txt";
const AvastarTeleporter = artifacts.require("contracts/AvastarTeleporter.sol");

module.exports = async function(done) {

    console.log('Creating log file...');
    let log = fs.createWriteStream(logfile);

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
        try {
            for (const trait of traits) {
                if (trait.svg) {
                    console.log(trait.gene, trait.variation);
                    await createTrait(teleporter, trait, accounts, log);
                }
            }
        } catch (e) {
            console.log('woopsy: ');
            console.log(e.message);
        }
        done();

    } else {
        console.log('Teleporter not deployed');
        done();
    }
};

async function createTrait(teleporter, trait, accounts, log){
    const max_art_size = 12798;
    const max_ext_size = 2133;

    let {generation, gender, gene, name, series, svg, variation} = trait;
    let preamble = `Gene: ${gene}, Variation: ${variation}, SVG Size: ${svg.length}`;
    logIt(log, preamble);
    if (svg.length < max_art_size) {
        try {
            let result = await teleporter.createTrait(generation, series, gender, gene, variation, name, svg, {
                from: accounts.sysAdmin,
                gas: '9950000'
            });
            let postamble = `Block: ${result.receipt.blockNumber} Gas Used: ${result.receipt.gasUsed}`;
            logIt(log, postamble);
        } catch (e) {
            let err = e.toString() + '\n';
            logIt(log, err);
        }
    } else {
        logIt(log, 'Skipping, SVG size over threshold.');
    }

    logIt(log, '\n');
};

function logIt(log, value) {
    console.log(value);
    log.write(`${value}\n`);
}

// Process the raw trait dump from the database, returning a single array
// of enum-adjusted objects, ready to be added to the contract
function getTraits(file) {
    const lookupGeneEnum = gene => constants.GENE[gene.toUpperCase().replace(' ','_')];
    const addGeneration = trait => trait['generation'] = constants.GENERATION.ONE;
    const adjustSeries = trait => trait.series = trait.series.map(item => --item);
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