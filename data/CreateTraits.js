const fs = require("fs");
const constants = require("../test/util/Constants");
const GetAccounts = require('./util/GetAccounts');
const traitsJSON = "data/avastars-dashboard-genes-export.json";
const logfile = "data/CreateTraitsLog.txt";
const AvastarTeleporter = artifacts.require("contracts/AvastarTeleporter.sol");

let total_gas = 0;
let most_gas_spent = 0;
let costliest_trait;

module.exports = async function(done) {
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
        try {
            for (const trait of traits) {
                if (trait.svg && trait.svg.length <= constants.MAX_ART_SIZE) {
                    await createTrait(teleporter, trait, accounts, log);
                } else if (trait.svg && trait.svg.length > constants.MAX_ART_SIZE){
                    // Split the trait into pieces
                    let initial = trait.svg.slice(0, constants.MAX_ART_SIZE);
                    let remainder = trait.svg.slice(constants.MAX_ART_SIZE);
                    let pieces = remainder.cordwood(constants.MAX_EXT_SIZE);

                    // Create the trait with the initial piece that is equal to max_art_length
                    trait.svg = initial;
                    let traitId = await createTrait(teleporter, trait, accounts, log);

                    // Extend the artwork with all the remaining pieces
                    for (const piece of pieces) {
                        logIt(log, `Extending art by ${piece.length}`);
                        await teleporter.extendTraitArt(traitId, piece, {
                            from: accounts.sysAdmin,
                            gas: '9950000'
                        });
                    }
                } else {
                    let {gene, variation} = trait;
                    let preamble = `Gene: ${gene}, Variation: ${variation}, SVG Size: 0`;
                    logIt(log, preamble);
                    logIt(log, "Skipping, no SVG data yet.");
                }
                logIt(log, '\n');
            }
        } catch (e) {
            console.log('woopsy: ');
            console.log(e.message);
        }

        let summary = `\n----------------------------------------\nTotal gas used: ${total_gas}\nCostliest Trait => \n${costliest_trait}`;
        logIt(log, summary);
        done();

    } else {
        console.log('Teleporter not deployed');
        done();
    }
};

async function createTrait(teleporter, trait, accounts, log){
    const bumpGas = gas => gas + Math.round((gas * .01));
    let {generation, gender, gene, name, series, svg, variation} = trait;
    let preamble = `Gene: ${gene}, Variation: ${variation}, Series: ${series.toString()} SVG Size: ${svg.length}`;
    logIt(log, preamble);
    let traitId = -1;
    try {
        let gas = await teleporter.createTrait.estimateGas(generation, series, gender, gene, variation, name, svg, {
            from: accounts.sysAdmin,
            gas: constants.MAX_GAS
        });
        let plusALittle = (bumpGas(gas) > constants.MAX_GAS)
            ? constants.MAX_GAS
            : bumpGas(gas);

        let estimate = `Estimated Gas: ${gas} Plus a little: ${plusALittle}`;
        logIt(log, estimate.toString());
        traitId = await teleporter.createTrait.call(generation, series, gender, gene, variation, name, svg, {
            from: accounts.sysAdmin,
            gas: plusALittle
        });
        let result = await teleporter.createTrait(generation, series, gender, gene, variation, name, svg, {
            from: accounts.sysAdmin,
            gas: plusALittle
        });
        let gasUsed = result.receipt.gasUsed;
        let postamble = `Trait ID: ${traitId} Block: ${result.receipt.blockNumber} Gas Used: ${gasUsed}`;
        logIt(log, postamble);

        total_gas += gasUsed;
        if (gasUsed > most_gas_spent) {
            most_gas_spent = gasUsed;
            costliest_trait = `${preamble}\n${estimate}\n${postamble}`;
        }
    } catch (e) {
        let err = e.toString() + '\n';
        logIt(log, err);
    }

    return traitId;
}


function logIt(log, value) {
    console.log(value);
    log.write(`${value}\n`);
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