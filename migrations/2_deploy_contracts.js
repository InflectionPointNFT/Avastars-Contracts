const AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
const AvastarPrimeMinter = artifacts.require("./AvastarPrimeMinter.sol");
const constants = require("../test/util/Constants");
const BN = require('bn.js');

module.exports = deployer => {
    deployer.then(async () => {

        // Deploy the contracts
        const avastarTeleporter = await deployer.deploy(AvastarTeleporter);
        const avastarPrimeMinter = await deployer.deploy(AvastarPrimeMinter);

        // Prepare the Avastar Teleporter contract for use
        await avastarTeleporter.setTokenUriBase(constants.TOKEN_URI_BASE.DEV);
        await avastarTeleporter.unpause();

        // Prepare the Avastar Prime Minter contract for use
        const generation = new BN(constants.GENERATION.ONE, 10);
        await avastarPrimeMinter.setTeleporterContract(avastarTeleporter.address);
        await avastarPrimeMinter.setCurrentGeneration(generation); // auto resets sets series
        // TODO: avastarPrimeMinter.addMinter(minter); // address that can invoke the purchasePrime function
        // TODO: avastarPrimeMinter.addOwner(owner);   // address that can withdraw the franchise balance
        await avastarPrimeMinter.unpause();

    });
};
