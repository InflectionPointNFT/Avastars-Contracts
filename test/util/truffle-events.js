const fs = require('fs');
const abiDecoder = require('abi-decoder');

// Local version of truffle-events library
// Originally from https://github.com/zulhfreelancer/truffle-events
// A stale pull request makes it work in Truffle 5: https://github.com/motonauta/truffle-events
// But the project appears abandoned.
// So...
module.exports = {
    getAbi: function(contractName) {
        let c = JSON.parse(fs.readFileSync(`./build/contracts/${contractName}.json`, `utf8`));
        return c.abi;
    },
    // eventIndex is zero-based
    formTxObject: function(eventContract, eventIndex, transaction) {
        let abi = this.getAbi(eventContract);
        // wrap in an array because 'decodeLogs' expects an array
        let receipt = transaction.receipt;
        let log     = [receipt.logs[eventIndex] || receipt.rawLogs[eventIndex]];
        abiDecoder.addABI(abi);

        let _decoded   = abiDecoder.decodeLogs(log);
        let decodedLog = _decoded[0];

        let txObject   = {};
        let tempArgs   = {};
        txObject.tx    = transaction.tx;
        txObject.logs  = [{"event":decodedLog.name}];

        for (var i = 0; i < decodedLog.events.length; i++) {
            let key = decodedLog.events[i].name;
            let val = decodedLog.events[i].value;
            tempArgs[`${key}`] = val;
        }

        txObject.logs[0].args = tempArgs;
        return txObject;
    }
}