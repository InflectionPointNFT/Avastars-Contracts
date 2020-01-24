const fs = require("fs");
const BN = require('bn.js');
const constants = require("../util/Constants");
const GetWeb3Accounts = require('../util/GetWeb3Accounts');
const GetGasCost = require('../util/GetGasCost');
const promosJSON = "data/create-promos.json";
const logfile = "data/create-promos.txt";
const AvastarTeleporter = artifacts.require("contracts/AvastarTeleporter.sol");
const div = "---------------------";

function ProcessedPromo(promo){
    this.promo = promo;
    this.id = "-";
    this.gasSpent = 0;
}
ProcessedPromo.prototype.toString = function() { return `Id: ${this.getId()}\tGas: ${this.getGasSpent()}`;};
ProcessedPromo.prototype.getId = function () { return this.id?String(this.id).padStart(3):""; };
ProcessedPromo.prototype.getGasSpent = function () { return (this.gasSpent)?String(this.gasSpent).padStart(8):""; };

let total_gas = 0;
const bumpGas = gas => gas + Math.round((gas * .01));
const logIt = (log, value) => { console.log(value); log.write(`${value}\n`) };

module.exports = async function(done) {

    console.log('Creating log file...');
    const log = fs.createWriteStream(logfile);

    console.log('Processing raw database dump...');
    const promos = getPromos(promosJSON);
    console.log(`${promos.length} promos processed.`);

    // Get accounts using default web3 provided by `truffle exec`
    console.log('Fetching accounts...');
    const accounts = await GetWeb3Accounts(web3);

    // Get teleporter contract instance, verify, and process
    let teleporter = await AvastarTeleporter.deployed();
    let isTeleporter = await teleporter.isAvastarTeleporter();
    if (isTeleporter) {
        console.log('Adding promos to contract...');
        logIt(log, div);
        logIt(log, `> Operational Maximums:`);
        logIt(log, `Gas/Tx: ${constants.MAX_GAS} units`);
        logIt(log, div);
        try {
            // Process all the promos
            for (const promo of promos) {

                let processing = new ProcessedPromo(promo);
                await createPromo(teleporter, processing, accounts, log);

                logIt(log, processing.toString());

                if (processing.gasSpent > 0) {
                    total_gas += processing.gasSpent;
                }
            }

            // Report the summary
            let gas_expenditure = await GetGasCost(web3, total_gas);
            logIt(log, div);
            logIt(log, `> Total Expenditure\n${gas_expenditure}`);
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

async function createPromo(teleporter, processing, accounts, log){
    let {generation, gender, series, score, level, hash} = processing.promo;
    let owner = accounts.owners[0];
    try {
        let gas = await teleporter.mintPrime.estimateGas(owner, hash, generation, series, gender, score, {
            from: accounts.minters[0],
            gas: constants.MAX_GAS
        });
        let plusALittle = (bumpGas(gas) > constants.MAX_GAS)
            ? constants.MAX_GAS
            : bumpGas(gas);

        let primeId = await teleporter.mintPrime.call(owner, hash, generation, series, gender, score, {
            from: accounts.minters[0],
            gas: plusALittle
        });

        let result = await teleporter.mintPrime(owner, hash, generation, series, gender, score, {
            from: accounts.minters[0],
            gas: plusALittle
        });

        let gasUsed = result.receipt.gasUsed;
        processing.id = primeId.tokenId;
        processing.gasSpent = gasUsed;

    } catch (e) {
        let err = e.toString() + '\n';
        logIt(log, err);
    }
}

// Process the raw promo dump from the database, returning a single array
// of enum-adjusted objects, ready to be added to the contract
function getPromos(file) {
    const prunePromo = promo => {delete promo.traits; delete promo.isPromo; delete promo.breaks};
    const adjustGeneration = promo => promo.generation = promo.generation - 1;
    const adjustGender = promo => promo.gender = constants.GENDER[promo.gender.toUpperCase()];
    let retVal;
    try {
        const json = fs.readFileSync(file, "utf8");
        const promos = JSON.parse(json);
        retVal = promos.map(promo => {
            adjustGeneration(promo);
            adjustGender(promo);
            prunePromo(promo);
            return promo;
        });
    } catch (e) {
        console.log('woopsy: ');
        console.log(e.message);
        process.exit();
    }
    return retVal;
}