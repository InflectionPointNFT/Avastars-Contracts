const fs = require("fs");
const ENV = 'rinkeby';
const logfile = `data/create-traits.${ENV}.txt`;
const logIt = (log, value) => { console.log(value); log.write(`${value}\n`) };


function ProcessedTrait(){
    this.trait = {};
    this.id = "-";
    this.totalGasSpent = 0;
    this.totalSections = 0;
}

let costliest_trait = {};
costliest_trait.totalGasSpent = 0;
costliest_trait.totalSections = 0;

module.exports = async function(done) {

    let lastTrait = fs.existsSync(logfile) ? readLog(logfile) : "";
    let log, options;
    if (lastTrait && lastTrait.trait.gene && lastTrait.trait.variation) {
        console.log('Resume current log from last successful trait.');
        options = {flags:'a'};
    } else {
        console.log('Start from scratch with new log.');
        options = {flags:'w'};
    }

    console.log('Opening log file...');
    log = fs.createWriteStream(logfile, options);
    console.log(costliest_trait);
    console.log(lastTrait);
    //await log.write('\ntest line\n');

    done();

};

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
        let obj = {};
        pairs.forEach(pair => obj[pair.split(":")[0]] = pair.split(":")[1]);
        lastSuccessfulTrait = convertObjToProcessed(obj);

        // find costliest trait
        lines.forEach( line => {
            obj = {};
            pairs = line.split("\t");
            pairs.forEach(pair => obj[pair.split(":")[0]] = pair.split(":")[1]);

            if (obj.Gas && Number(obj.Gas.trim()) > costliest_trait.totalGasSpent) {
                costliest_trait = convertObjToProcessed(obj);
            }
        });

    } catch (e) {
        console.log(e.message);
    }
    return lastSuccessfulTrait;
}