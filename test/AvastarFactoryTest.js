const AvastarFactoryWrapper = artifacts.require("./AvastarFactoryWrapper.sol");
const exceptions = require ("../util/Exceptions");
const constants = require("../util/Constants");
const traitData = require("./data/TraitData");
const traitMath = require("../util/TraitMath");

const BN = require('bn.js');

contract('AvastarFactory', function(accounts) {

    let contract;
    const sysAdmin = accounts[0];
    const tokenOwner = accounts[1];
    const minter = accounts[2];
    const stranger = accounts[3];
    const traits1 = new BN('4835703422573704792572931', 10);
    const traits2 = new BN('59374701396491835636974613', 10);
    const traits3 = traitMath.computeHash(traitData.avastar);
    const id1 = new BN(0,10);
    const id2 = new BN(1,10);
    const id3 = new BN(2,10);

    const avastar = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.ONE,
        "wave"       : constants.WAVE.PRIME,
        "serial"     : 0,
        "traits"     : traits1,
        "ranking"    : 33
    };

    const prime = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.FEMALE,
        "series"     : constants.SERIES.TWO,
        "wave"       : constants.WAVE.PRIME,
        "serial"     : 1,
        "traits"     : traits2,
        "ranking"    : 46
    };

    const replicant = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.ONE,
        "wave"       : constants.WAVE.REPLICANT,
        "serial"     : 6,
        "traits"     : traits3,
        "ranking"    : 68
    };

    before(async () => {

        // Get the AvastarContract contract instance for this suite
        contract = await AvastarFactoryWrapper.new();

        // Unpause the contracts
        await contract.unpause({from: sysAdmin});

    });

    it("should not mint an Avastar if the given Generation is invalid / out of range", async function() {

        // Attempt to Mint Avastar with out of range Generation
        await exceptions.catchInvalidOpcode(
            contract._mintAvastar(tokenOwner, avastar.serial, avastar.traits, 12, avastar.wave)
        );

    });


    it("should not mint an Avastar if the given Prime serial is incorrect for the Generation", async function() {

        // Attempt to Mint Avastar with wrong Prime serial
        await exceptions.catchRevert(
            contract._mintAvastar(tokenOwner, prime.serial, prime.traits, prime.generation, prime.wave)
        );

    });

    it("should not mint an Avastar if the given Replicant serial is incorrect for the Generation", async function() {

        // Attempt to Mint Avastar with wrong Prime serial
        await exceptions.catchRevert(
            contract._mintAvastar(tokenOwner, replicant.serial, replicant.traits, replicant.generation, replicant.wave)
        );

    });

    it("should allow descendant contracts to mint an Avastar", async function() {

        // Check potential tokenId with call
        let tokenId = await contract._mintAvastar.call(tokenOwner, avastar.serial, avastar.traits, avastar.generation, avastar.wave);
        assert.ok(tokenId.eq(id1), "TokenId wasn't correct");

        // Mint avastar
        // No event expected. it's only called internally from mintPrime or mintReplicant who emit their own events
        await contract._mintAvastar(tokenOwner, avastar.serial, avastar.traits, avastar.generation, avastar.wave);
    });

    it("should allow anyone to retrieve the wave for a given Avastar by Token ID", async function() {

        // Get the Avastar info
        const wave = await contract.getAvastarWaveByTokenId(id1, {from: stranger});

        // Test results
        assert.equal(wave.toNumber(), constants.WAVE.PRIME, "Wave field wasn't correct");

    });

});