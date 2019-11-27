const GetAccounts = require('./util/GetAccounts');
const AvastarTeleporter = artifacts.require("contracts/AvastarTeleporter.sol");
const fs = require("fs");

module.exports = async function(done) {

    // Get accounts using default web3 provided by `truffle exec`
    const accounts = await GetAccounts(web3);

    // Create teleporter contract, verify, unpause
    let teleporter = await AvastarTeleporter.new();
    let isTeleporter = await teleporter.isAvastarTeleporter();
    if (isTeleporter) {
        await teleporter.unpause({from: accounts.sysAdmin});
        // TODO: Create traits
    } else {
        console.log('Teleporter not deployed');
    }

    done();
};