const fs = require("fs");

const NETWORK = 'ropsten';
const logfile = `data/create-promos.${NETWORK}.txt`;

const BN = require('bn.js');
const constants = require("../util/Constants");
const AccountManager = require('../util/AccountManager');
const GetGasCost = require('../util/GetGasCost');
const promosJSON = "data/create-promos.json";
const AvastarTeleporter = artifacts.require("contracts/AvastarTeleporter.sol");
const div = "---------------------";

function ProcessedPromo(promo){
    this.promo = promo;
    this.id = "-";
    this.gasSpent = 0;
}
ProcessedPromo.prototype.toString = function() { return `Id: ${this.getId()}\tSerial: ${this.getSerial()}\tScore: ${this.getScore()}\tGas: ${this.getGasSpent()}`;};
ProcessedPromo.prototype.getId = function () { return this.id?String(this.id).padStart(3):""; };
ProcessedPromo.prototype.getSerial = function () { return String(this.promo.serial).padStart(3); };
ProcessedPromo.prototype.getScore = function () { return String(this.promo.score).padStart(3); };
ProcessedPromo.prototype.getGasSpent = function () { return (this.gasSpent)?String(this.gasSpent).padStart(8):""; };

let total_gas = 0;
const bumpGas = gas => gas + Math.round((gas * .01));
const logIt = (log, value) => { console.log(value); log.write(`${value}\n`) };

module.exports = async function(done) {

    console.log('Environment / network...');
    const env = AccountManager.getEnvByNetwork(NETWORK);
    console.log(env, NETWORK);

    console.log('Fetching accounts...');
    const accounts = AccountManager.getAccounts(env);
    console.log(accounts);
    process.exit(); // SAFETY CATCH: Comment out to run

    // Attempt to read logfile, then decide whether to write or append
    let lastPromo = fs.existsSync(logfile) ? readLog(logfile) : null;
    let log, options;
    if (lastPromo && lastPromo.promo.serial) {
        console.log('Resume current log from last successful promo.');
        options = {flags:'a'};
    } else {
        console.log('Start from scratch with new log.');
        options = {flags:'w'};
    }
    log = fs.createWriteStream(logfile, options);

    console.log(lastPromo);

    console.log('Processing raw database dump...');
    const promos = getPromos(promosJSON);
    console.log(`${promos.length} promos processed.`);

    // Function to determine if we should skip processing a promo
    const shouldSkip = (processing, lastPromo) => lastPromo && processing.promo.serial <= lastPromo.promo.serial;

    // Get teleporter contract instance, verify, and process
    let teleporter = await AvastarTeleporter.deployed();
    let isTeleporter = await teleporter.isAvastarTeleporter();
    if (isTeleporter) {
        console.log('Adding promos to contract...');
        // Are we starting fresh or restarting?
        if (!lastPromo) {
            logIt(log, div);
            logIt(log, `> Operational Maximums:`);
            logIt(log, `Gas/Tx: ${constants.MAX_GAS} units`);
            logIt(log, div);
        } else {
            logIt(log, "");
        }

        try {
            // Process all the promos
            for (const promo of promos) {

                let processing = new ProcessedPromo(promo);

                if (!shouldSkip(processing, lastPromo)) {

                    try {
                        await createPromo(teleporter, processing, accounts, log);
                    } catch (e) {
                        console.log(e.message);
                        process.exit();
                    }

                    logIt(log, processing.toString());

                    if (processing.gasSpent > 0) {
                        total_gas += processing.gasSpent;
                    }
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


// Read the previous log file and find the last successful promo
function readLog(file) {
    let lastSuccessfulPromo;

    const convertObjToProcessed = obj => {
        let processed = new ProcessedPromo();
        processed.id = Number(obj.Id.trim());
        processed.gasSpent = Number(obj.Gas.trim());
        processed.promo = {
            serial: Number(obj.Serial.trim()),
            score:  Number(obj.Score.trim()),
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
        lastSuccessfulPromo = convertObjToProcessed(obj);

        // accumulate gas and find costliest promo
        lines.forEach( line => {
            obj = {};
            pairs = line.split("\t");
            pairs.forEach(pair => obj[pair.split(":")[0]] = pair.split(":")[1]);
            gas = (!!obj.Gas) ? Number(obj.Gas.trim()) : 0;
            total_gas += gas;
        });

    } catch (e) {
        console.log(e.message);
    }
    return lastSuccessfulPromo;
}