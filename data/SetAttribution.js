const fs = require("fs");
const constants = require("../util/Constants");
const GetAccounts = require('./util/GetAccounts');
const GetGasCost = require('./util/GetGasCost');
const AvastarTeleporter = artifacts.require("contracts/AvastarTeleporter.sol");
const attribution = {
    "generation": constants.GENERATION.ONE,
    "artist": "Marmota vs Milky",
    "infoURI": "https://www.twine.fm/marmotavsmilky"

};
module.exports = async function(done) {

    // Get accounts using default web3 provided by `truffle exec`
    console.log('Fetching accounts...');
    const accounts = await GetAccounts(web3);


    // Create teleporter contract, verify, unpause
    let teleporter = await AvastarTeleporter.deployed();
    let isTeleporter = await teleporter.isAvastarTeleporter();
    if (isTeleporter) {
        console.log('Adding artist attribution for Generation 1...');
        console.log('----------------------------');

        try {
            const {generation, artist, infoURI} = attribution;

            // set the attribution
            let result = await teleporter.setAttribution(generation, artist, infoURI);

            console.log('Gas used:', result.receipt.gasUsed);

        } catch (e) {
            console.log(e.message);
        }

        done();

    } else {
        console.log('Teleporter not deployed');
        done();
    }
};