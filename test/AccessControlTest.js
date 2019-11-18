const AccessControl = artifacts.require("./AccessControl.sol");
const truffleAssert = require('truffle-assertions');
const exceptions = require ("./util/Exceptions");

contract('AccessControl', function(accounts) {

    let contract, result;
    const sysAdmin = accounts[0];
    const nonSysAdmin = accounts[1];
    const minter = accounts[2];
    const owner = accounts[3];
    const newSysAdmin = accounts[4];
    const newContractAddress = accounts[3]; // just for these tests, treat this as a contract address

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

    it("should allow sysadmin to pause the contract when unpaused", async function() {

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

    it("should allow sysadmin to unpause the contract when paused", async function() {

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

    it("should allow sysadmin to add a minter", async function() {

        // Pause the contract
        result = await contract.addMinter(minter, {from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(
            result,
            'MinterAdded',
            (ev) => {
                return (
                    ev.minterAddress === minter
                )},
            'MinterAdded event should be emitted'
        );

    });

    it("should allow sysadmin to add an owner", async function() {

        // Pause the contract
        result = await contract.addOwner(owner, {from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(
            result,
            'OwnerAdded',
            (ev) => {
                return (
                    ev.ownerAddress === owner
                )},
            'OwnerAdded event should be emitted'
        );

    });

    it("should allow sysadmin to add a sysadmin", async function() {

        // Pause the contract
        result = await contract.addSysAdmin(newSysAdmin, {from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(
            result,
            'SysAdminAdded',
            (ev) => {
                return (
                    ev.sysAdminAddress === newSysAdmin
                )},
            'SysAdminAdded event should be emitted'
        );

    });


    it("should not allow non-sysadmins to set upgrade the contract when unpaused", async function() {

        // Try to set the new contract address
        await exceptions.catchRevert(
            contract.upgradeContract(newContractAddress, {from: nonSysAdmin})
        );

    });

    it("should not allow sysadmin to upgrade the contract when unpaused", async function() {

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

    it("should allow sysadmin to upgrade the contract when paused", async function() {

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

    it("should not allow sysadmin to unpause contract after the contract is upgraded", async function() {

        // Try to unpause the contract
        await exceptions.catchRevert(
            contract.unpause({from: sysAdmin})
        );

    });

});
