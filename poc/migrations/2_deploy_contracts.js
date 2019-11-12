let AvaStars = artifacts.require("./POC_AvaStars.sol");

module.exports = deployer => {
    deployer.then(async () => {

        // Deploy the contract
        const avaStars = await deployer.deploy(AvaStars);

        // Unpause the contract
        await avaStars.unpause();

    });
};
