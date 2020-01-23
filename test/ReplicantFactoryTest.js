const ReplicantFactory = artifacts.require("./ReplicantFactory.sol");
const truffleAssert = require('truffle-assertions');
const exceptions = require ("../util/Exceptions");
const constants = require("../util/Constants");
const BN = require('bn.js');

contract('ReplicantFactory', function(accounts) {

    let contract ;
    const sysAdmin = accounts[0];
    const tokenOwner = accounts[1];
    const minter = accounts[2];
    const anyone = accounts[3];
    const traits0 = new BN('1388469136269139274629418', 10);
    const traits1 = new BN('4835703422573704792572931', 10);
    const traits2 = new BN('59374701396491835636974613', 10);
    const traits3 = new BN('6044669605981521127212033', 10);

    const prime1 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.ONE,
        "traits"     : traits0,
        "ranking"    : 12
    };

    const replicant1 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "traits"     : traits1,
        "ranking"    : 33
    };

    const replicant2 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.FEMALE,
        "traits"     : traits2,
        "ranking"    : 46
    };

    const replicant3 = {
        "generation" : constants.GENERATION.TWO,
        "gender"     : constants.GENDER.MALE,
        "traits"     : traits3,
        "ranking"    : 68
    };

    const replicant4 = { // Duplicate hash within a generation, don't allow!
        "generation" : constants.GENERATION.TWO, // SAME gen as prime3
        "gender"     : constants.GENDER.FEMALE,    // DIFF gender from prime3
        "traits"     : traits3,                    // SAME hash as prime3
        "ranking"    : 27                          // DIFF ranking from prime3
    };

    const replicant5 = { // Duplicate hash different generation, should allow!
        "generation" : constants.GENERATION.THREE, // DIFF gen as prime4
        "gender"     : constants.GENDER.FEMALE,    // SAME gender as prime4
        "traits"     : traits3,                    // SAME hash as prime3
        "ranking"    : 27                          // SAME ranking as prime4
    };

    before(async () => {
        // Get the contract instance for this suite
        contract = await ReplicantFactory.new();

        // Unpause the contract
        await contract.unpause();

        // Add the minter
        await contract.addMinter(minter);

        const {generation, gender, series, traits, ranking} = prime1;
        await contract.mintPrime(tokenOwner, traits, generation, series, gender, ranking, {from: minter});

    });

    it("should not allow system administrator to create a replicant", async function() {

        const {generation, gender, traits, ranking} = replicant1;

        // Try to mint the replicant
        await exceptions.catchRevert(
            contract.mintReplicant(tokenOwner, traits, generation, gender, ranking, {from: sysAdmin})
        )

    });

    it("should not allow non-minters to create a replicant", async function() {

        const {generation, gender, traits, ranking} = replicant1;

        // Try to mint the replicant
        await exceptions.catchRevert(
            contract.mintReplicant(tokenOwner, traits, generation, gender, ranking, {from: anyone})
        )

    });

    it("should not allow minter to create a replicant with a hash used by a prime in same generation", async function() {

        const {generation, gender, ranking} = replicant1;
        const traits = traits0;

        // Try to mint the replicant
        await exceptions.catchRevert(
            contract.mintReplicant(tokenOwner, traits, generation, gender, ranking, {from: minter})
        )

    });

    it("should allow minter to create a replicant", async function() {

        const {generation, gender, traits, ranking} = replicant1;
        let id = new BN(1,10);
        let serial = new BN(0,10);

        // Mint the prime
        let result = await contract.mintReplicant(tokenOwner, traits, generation, gender, ranking, {from: minter});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewReplicant', (ev) => {
            return (
                ev.id.eq(id) &&
                ev.serial.eq(serial) &&
                ev.generation.toNumber() === generation &&
                ev.gender.toNumber() === gender &&
                ev.traits.eq(traits)
            );
        }, 'NewReplicant event should be emitted with correct info');

    });

    it("should allow minter to create a replicant same generation, serial increases", async function() {

        const {generation, gender, traits, ranking} = replicant2;
        let id = new BN(2,10);
        let serial = new BN(1,10);

        // Mint the replicant
        let result = await contract.mintReplicant(tokenOwner, traits, generation, gender, ranking, {from: minter});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewReplicant', (ev) => {
            return (
                ev.id.eq(id) &&
                ev.serial.eq(serial) &&
                ev.generation.toNumber() === generation &&
                ev.gender.toNumber() === gender &&
                ev.traits.eq(traits)
            );
        }, 'NewReplicant event should be emitted with correct info');

    });

    it("should allow minter to create a replicant different generation, token id increases and serial resets", async function() {

        const {generation, gender, traits, ranking} = replicant3;
        let id = new BN(3,10);
        let serial = new BN(0,10);

        // Mint the prime
        let result = await contract.mintReplicant(tokenOwner, traits, generation, gender, ranking, {from: minter});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewReplicant', (ev) => {
            return (
                ev.id.eq(id) &&
                ev.serial.eq(serial) &&
                ev.generation.toNumber() === generation &&
                ev.gender.toNumber() === gender &&
                ev.traits.eq(traits)
            );
        }, 'NewReplicant event should be emitted with correct info');

    });

    it("should not allow minter to create a replicant in the same generation with the same trait hash", async function() {

        const {generation, gender, traits, ranking} = replicant4;

        // Try to mint the replicant
        await exceptions.catchRevert(
            contract.mintReplicant(tokenOwner, traits, generation, gender, ranking, {from: minter})
        )

    });

    it("should allow minter to create a replicant in a different generation with same trait hash", async function() {

        const {generation, gender, traits, ranking} = replicant5;
        let id = new BN(4,10);
        let serial = new BN(0,10);

        // Mint the prime
        let result = await contract.mintReplicant(tokenOwner, traits, generation, gender, ranking, {from: minter});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewReplicant', (ev) => {
            return (
                ev.id.eq(id) &&
                ev.serial.eq(serial) &&
                ev.generation.toNumber() === generation &&
                ev.gender.toNumber() === gender &&
                ev.traits.eq(traits)
            );
        }, 'NewReplicant event should be emitted with correct info');

    });

    it("should allow anyone to retrieve a replicant by generation and serial number", async function() {

        const {generation, gender, traits, ranking} = replicant2;
        const id = new BN(2,10);
        const serial = new BN(1,10);

        const replicant = await contract.getReplicantByGenerationAndSerial(generation, serial, {from: anyone});
        assert.ok(replicant[0].eq(id), "Token ID field wasn't correct");
        assert.ok(replicant[1].eq(serial), "Serial field wasn't correct");
        assert.ok(replicant[2].eq(traits), "Traits field wasn't correct");
        assert.equal(replicant[3].toNumber(), generation, "Generation field wasn't correct");
        assert.equal(replicant[4].toNumber(), gender, "Gender field wasn't correct");
        assert.equal(replicant[5].toNumber(), ranking, "Ranking field wasn't correct");

    });

    it("should allow anyone to retrieve a replicant by token id", async function() {

        const {generation, gender, traits, ranking} = replicant3;
        let id = new BN(3,10);
        let serial = new BN(0,10);

        const replicant = await contract.getReplicantByTokenId(id, {from: anyone});
        assert.ok(replicant[0].eq(id), "Token ID field wasn't correct");
        assert.ok(replicant[1].eq(serial), "Serial field wasn't correct");
        assert.ok(replicant[2].eq(traits), "Traits field wasn't correct");
        assert.equal(replicant[3].toNumber(), generation, "Generation field wasn't correct");
        assert.equal(replicant[4].toNumber(), gender, "Gender field wasn't correct");
        assert.equal(replicant[5].toNumber(), ranking, "Ranking field wasn't correct");

    });

});
