let AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
let AvastarMinter = artifacts.require("./AvastarMinter.sol");

module.exports = deployer => {
    deployer.then(async () => {

        // Deploy the contracts
        const avastarTeleporter = await deployer.deploy(AvastarTeleporter);
        const avastarMinter = await deployer.deploy(AvastarMinter);

        // Unpause the contract
        await avastarTeleporter.unpause();
        await avastarMinter.unpause();

    });
};
