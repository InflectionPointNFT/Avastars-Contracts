const fs = require("fs");
const constants = require("../util/Constants");
const AvastarTeleporter = artifacts.require("contracts/AvastarTeleporter.sol");
const attribution = {
    "generation": constants.GENERATION.ONE,
    "artist": "Marmota vs Milky",
    "infoURI": "https://www.twine.fm/marmotavsmilky"

};
module.exports = async function(done) {

    // Create teleporter contract, verify, unpause
    let teleporter = await AvastarTeleporter.deployed();
    let isTeleporter = await teleporter.isAvastarTeleporter();
    if (isTeleporter) {
        console.log('Adding artist attribution for Generation 1...');

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