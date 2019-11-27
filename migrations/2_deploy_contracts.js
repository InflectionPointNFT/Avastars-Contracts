let AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
let AvastarPrimeMinter = artifacts.require("./AvastarPrimeMinter.sol");

module.exports = deployer => {
    deployer.then(async () => {

        // Deploy the contracts
        const avastarTeleporter = await deployer.deploy(AvastarTeleporter);
        const avastarPrimeMinter = await deployer.deploy(AvastarPrimeMinter);

        // Unpause the contract
        await avastarTeleporter.unpause();
        await avastarPrimeMinter.unpause();

    });
};
