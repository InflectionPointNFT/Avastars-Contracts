const PrimeFactory = artifacts.require("./PrimeFactory.sol");
const truffleAssert = require('truffle-assertions');
const exceptions = require ("../util/Exceptions");
const constants = require("../util/Constants");
const BN = require('bn.js');

contract('PrimeFactory', function(accounts) {

    let contract ;
    const sysAdmin = accounts[0];
    const tokenOwner = accounts[1];
    const minter = accounts[2];
    const anyone = accounts[3];
    const traits1 = new BN('4835703422573704792572931', 10);
    const traits2 = new BN('59374701396491835636974613', 10);
    const traits3 = new BN('6044669605981521127212033', 10);

    const prime1 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.ONE,
        "traits"     : traits1,
        "ranking"    : 33
    };

    const prime2 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.FEMALE,
        "series"     : constants.SERIES.TWO,
        "traits"     : traits2,
        "ranking"    : 46
    };

    const prime3 = {
        "generation" : constants.GENERATION.TWO,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.ONE,
        "traits"     : traits3,
        "ranking"    : 68
    };

    const prime4 = { // Duplicate hash within a generation, don't allow!
        "generation" : constants.GENERATION.TWO, // SAME gen as prime3
        "gender"     : constants.GENDER.FEMALE,    // DIFF gender from prime3
        "series"     : constants.SERIES.THREE,     // DIFF series from prime3
        "traits"     : traits3,                    // SAME hash as prime3
        "ranking"    : 27                          // DIFF ranking from prime3
    };

    const prime5 = { // Duplicate hash different generation, should allow!
        "generation" : constants.GENERATION.THREE, // DIFF gen as prime4
        "gender"     : constants.GENDER.FEMALE,    // SAME gender as prime4
        "series"     : constants.SERIES.THREE,     // SAME series as prime4
        "traits"     : traits3,                    // SAME hash as prime3
        "ranking"    : 27                          // SAME ranking as prime4
    };

    before(async () => {
        // Get the contract instance for this suite
        contract = await PrimeFactory.new();

        // Unpause the contract
        await contract.unpause();

        // Add the minter
        await contract.addMinter(minter);
    });

    it("should not allow system administrator to create a prime", async function() {

        const {generation, gender, series, traits, ranking} = prime1;

        // Try to mint the prime
        await exceptions.catchRevert(
            contract.mintPrime(tokenOwner, traits, generation, series, gender, ranking, {from: sysAdmin})
        )

    });

    it("should not allow non-minters to create a prime", async function() {

        const {generation, gender, series, traits, ranking} = prime1;

        // Try to mint the prime
        await exceptions.catchRevert(
            contract.mintPrime(tokenOwner, traits, generation, series, gender, ranking, {from: anyone})
        )

    });

    it("should allow minter to create a prime", async function() {

        const {generation, gender, series, traits, ranking} = prime1;
        let id = new BN(0,10);
        let serial = new BN(0,10);

        // Mint the prime
        let result = await contract.mintPrime(tokenOwner, traits, generation, series, gender, ranking, {from: minter});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewPrime', (ev) => {
            return (
                ev.id.eq(id) &&
                ev.serial.eq(serial) &&
                ev.generation.toNumber() === generation &&
                ev.series.toNumber() === series &&
                ev.gender.toNumber() === gender &&
                ev.traits.eq(traits)
            );
        }, 'NewPrime event should be emitted with correct info');

    });

    it("should increase countByGenerationAndSeries after minting a prime", async function() {

        const {generation, gender, series, traits, ranking} = prime1;
        let expected = new BN(1,10);

        // Check the count
        let result = await contract.countByGenerationAndSeries(generation, series, {from: minter});
        assert.ok(result.eq(expected));

    });

    it("should allow minter to create a prime in same generation but different series, token id and serial both increase", async function() {

        const {generation, gender, series, traits, ranking} = prime2;
        let id = new BN(1,10);
        let serial = new BN(1,10);

        // Mint the prime
        let result = await contract.mintPrime(tokenOwner, traits, generation, series, gender, ranking, {from: minter});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewPrime', (ev) => {
            return (
                ev.id.eq(id) &&
                ev.serial.eq(serial) &&
                ev.generation.toNumber() === generation &&
                ev.series.toNumber() === series &&
                ev.gender.toNumber() === gender &&
                ev.traits.eq(traits)
            );
        }, 'NewPrime event should be emitted with correct info');

    });

    it("should allow minter to create a prime different generation first series, token id increases and serial resets", async function() {

        const {generation, gender, series, traits, ranking} = prime3;
        let id = new BN(2,10);
        let serial = new BN(0,10);

        // Mint the prime
        let result = await contract.mintPrime(tokenOwner, traits, generation, series, gender, ranking, {from: minter});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewPrime', (ev) => {
            return (
                ev.id.eq(id) &&
                ev.serial.eq(serial) &&
                ev.generation.toNumber() === generation &&
                ev.series.toNumber() === series &&
                ev.gender.toNumber() === gender &&
                ev.traits.eq(traits)
            );
        }, 'NewPrime event should be emitted with correct info');

    });

    it("should not allow minter to create a prime in the same generation with the same trait hash", async function() {

        const {generation, gender, series, traits, ranking} = prime4;

        // Try to mint the prime
        await exceptions.catchRevert(
            contract.mintPrime(tokenOwner, traits, generation, series, gender, ranking, {from: minter})
        )

    });

    it("should allow minter to create a prime in a different generation with same trait hash", async function() {

        const {generation, gender, series, traits, ranking} = prime5;
        let id = new BN(3,10);
        let serial = new BN(0,10);

        // Mint the prime
        let result = await contract.mintPrime(tokenOwner, traits, generation, series, gender, ranking, {from: minter});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewPrime', (ev) => {
            return (
                ev.id.eq(id) &&
                ev.serial.eq(serial) &&
                ev.generation.toNumber() === generation &&
                ev.series.toNumber() === series &&
                ev.gender.toNumber() === gender &&
                ev.traits.eq(traits)
            );
        }, 'NewPrime event should be emitted with correct info');

    });

    it("should allow anyone to retrieve a prime by generation and serial number", async function() {

        const {generation, gender, series, traits, ranking} = prime2;
        const id = new BN(1,10);
        const serial = new BN(1,10);

        const prime = await contract.getPrimeByGenerationAndSerial(generation, serial, {from: anyone});
        assert.ok(prime[0].eq(id), "Token ID field wasn't correct");
        assert.ok(prime[1].eq(serial), "Serial field wasn't correct");
        assert.ok(prime[2].eq(traits), "Traits field wasn't correct");
        assert.equal(prime[3].toNumber(), generation, "Generation field wasn't correct");
        assert.equal(prime[4].toNumber(), series, "Series field wasn't correct");
        assert.equal(prime[5].toNumber(), gender, "Gender field wasn't correct");
        assert.equal(prime[6].toNumber(), ranking, "Ranking field wasn't correct");

    });

    it("should allow anyone to retrieve a prime by token id", async function() {

        const {generation, gender, series, traits, ranking} = prime3;
        let id = new BN(2,10);
        let serial = new BN(0,10);
        const prime = await contract.getPrimeByTokenId(id, {from: anyone});
        assert.ok(prime[0].eq(id), "Token ID field wasn't correct");
        assert.ok(prime[1].eq(serial), "Serial field wasn't correct");
        assert.ok(prime[2].eq(traits), "Traits field wasn't correct");
        assert.equal(prime[3].toNumber(), generation, "Generation field wasn't correct");
        assert.equal(prime[4].toNumber(), series, "Series field wasn't correct");
        assert.equal(prime[5].toNumber(), gender, "Gender field wasn't correct");
        assert.equal(prime[6].toNumber(), ranking, "Ranking field wasn't correct");

    });

    it("should allow anyone to retrieve a prime's replication flags by token id", async function() {

        let id = new BN(2,10);
        const replicated = JSON.stringify([ // 12 false booleans
            false, false, false, false, false, false,
            false, false, false, false, false, false
        ]);

        const result = await contract.getPrimeReplicationByTokenId(id, {from: anyone});

        assert.ok(result[0].eq(id), "Token ID field wasn't correct");
        assert.ok(JSON.stringify(result[1]) === replicated, "Replication flags weren't correct");

    });

});
