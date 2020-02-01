const AccessControl = artifacts.require("./AccessControl.sol");
const truffleAssert = require('truffle-assertions');
const exceptions = require ("../util/Exceptions");
const BN = require('bn.js');

contract('AccessControl', function(accounts) {

    let contract, result;
    const sysAdmin = accounts[0];
    const nonSysAdmin = accounts[1];
    const minter = accounts[2];
    const owner = accounts[3];
    const newSysAdmin = accounts[4];
    const newOwner = accounts[5];
    const newContractAddress = accounts[3]; // just for these tests, treat this as a contract address
    const zeroAddress = "0x0000000000000000000000000000000000000000";

    before(async () => {

        // Get the contract instance for this suite
        contract = await AccessControl.new();

        // Unpause the contract
        await contract.unpause();

    });

    it("should not allow non-sysadmins to pause the contract", async function() {

        // Try to pause the contract
        await exceptions.catchRevert(
            contract.pause({from: nonSysAdmin})
        );

    });

    it("should allow a sysadmin to pause the contract when unpaused", async function() {

        // Pause the contract
        result = await contract.pause({from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(
            result,
            'ContractPaused',
            null,
            'ContractPaused event should be emitted'
        );

    });

    it("should not allow non-sysadmins to unpause the contract", async function() {

        // Try to unpause the contract
        await exceptions.catchRevert(
            contract.unpause({from: nonSysAdmin})
        );

    });

    it("should allow a sysadmin to unpause the contract when paused", async function() {

        // Pause the contract
        result = await contract.unpause( {from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(
            result,
            'ContractUnpaused',
            null,
            'ContractUnpaused event should be emitted'
        );

    });

    it("should allow a sysadmin to add a minter", async function() {

        // Add the role
        await contract.addMinter(minter, {from: sysAdmin});

    });

    it("should allow a sysadmin to add a sysadmin", async function() {

        // Add the role
        await contract.addSysAdmin(newSysAdmin, {from: sysAdmin});

    });

    it("should allow a sysadmin to add an owner", async function() {

        // Add the role
        await contract.addOwner(owner, {from: sysAdmin});

    });

    it("should allow a sysadmin to add another owner", async function() {

        // Add the role
        await contract.addOwner(newOwner, {from: sysAdmin});

    });

    it("should not allow non-sysadmins to set upgrade the contract when unpaused", async function() {

        // Try to set the new contract address
        await exceptions.catchRevert(
            contract.upgradeContract(newContractAddress, {from: nonSysAdmin})
        );

    });

    it("should not allow a sysadmin to upgrade the contract when unpaused", async function() {

        // Try to upgrade the contract
        await exceptions.catchRevert(
            contract.upgradeContract(newContractAddress, {from: sysAdmin})
        );

    });

    it("should not allow non-sysadmins to upgrade the contract when paused", async function() {

        result = await contract.pause({from: sysAdmin});

        // Try to set the new contract address
        await exceptions.catchRevert(
            contract.upgradeContract(newContractAddress, {from: nonSysAdmin})
        );

        await contract.unpause({from: sysAdmin});
    });

    it("should not allow sysadmins to upgrade the contract with a zero address even if paused", async function() {

        result = await contract.pause({from: sysAdmin});

        // Try to upgrade to the zero address
        await exceptions.catchRevert(
            contract.upgradeContract(zeroAddress, {from: sysAdmin})
        );

        await contract.unpause({from: sysAdmin});
    });

    it("should allow a sysadmin to upgrade the contract when paused", async function() {

        // Pause the contract
        result = await contract.pause({from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(
            result,
            'ContractPaused',
            null,
            'ContractPaused event should be emitted'
        );

        // Set new contract address
        result = await contract.upgradeContract(newContractAddress, {from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(
            result,
            'ContractUpgrade',
            ev => ev.newContract === newContractAddress,
            'ContractUpgrade event should be emitted with correct info'
        );

    });

    it("should not allow a sysadmin to unpause contract after the contract is upgraded", async function() {

        // Try to unpause the contract
        await exceptions.catchRevert(
            contract.unpause({from: sysAdmin})
        );

    });

    it("should not allow a sysadmin to remove an owner", async function() {

        // Try to strip all the roles from this address
        await exceptions.catchRevert(
            contract.stripRoles(owner, {from: sysAdmin})
        );

    });

    it("should not allow a sysadmin to remove a minter", async function() {

        // Try to strip all the roles from this address
        await exceptions.catchRevert(
            contract.stripRoles(minter, {from: sysAdmin})
        );

    });

    it("should not allow a sysadmin to remove a sysadmin", async function() {

        // Try to strip all the roles from this address
        await exceptions.catchRevert(
            contract.stripRoles(newSysAdmin, {from: sysAdmin})
        );

    });

    it("should not allow a minter to remove an owner", async function() {

        // Try to strip all the roles from this address
        await exceptions.catchRevert(
            contract.stripRoles(owner, {from: minter})
        );

    });

    it("should not allow a minter to remove a minter", async function() {

        // Try to strip all the roles from this address
        await exceptions.catchRevert(
            contract.stripRoles(minter, {from: minter})
        );

    });

    it("should not allow a minter to remove a sysadmin", async function() {

        // Try to strip all the roles from this address
        await exceptions.catchRevert(
            contract.stripRoles(newSysAdmin, {from: minter})
        );

    });

    it("should allow an owner to remove a sysadmin", async function() {

        // Strip all the roles from this address
        // Reverts if address didn't have the role
        await contract.stripRoles(sysAdmin, {from: owner});

    });

    it("should allow an owner to remove a minter", async function() {

        // Strip all the roles from this address
        // Reverts if address didn't have the role
        await contract.stripRoles(minter, {from: owner});

    });

    it("should allow an owner to remove an owner", async function() {

        // Strip all the roles from this address
        // Reverts if address didn't have the role
        await contract.stripRoles(newOwner, {from: owner});

    });

    it("should not allow owner to remove own roles", async function() {

        // Try to strip all the roles from owner's own address
        await exceptions.catchRevert(
            contract.stripRoles(owner, {from: owner})
        );

    });

});
