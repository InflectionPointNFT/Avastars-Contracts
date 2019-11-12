let AvastarTransporter = artifacts.require("./AvastarTransporter.sol");
let AvastarMinter = artifacts.require("./AvastarMinter.sol");

module.exports = deployer => {
    deployer.then(async () => {

        // Deploy the contracts
        const avastarTransporter = await deployer.deploy(AvastarTransporter);
        const avastarMinter = await deployer.deploy(AvastarMinter);

        // Unpause the contract
        await avastarTransporter.unpause();
        await avastarMinter.unpause();

    });
};
