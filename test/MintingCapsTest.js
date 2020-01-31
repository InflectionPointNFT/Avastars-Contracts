const ReplicantFactory = artifacts.require("./ReplicantFactoryWrapper.sol");
const truffleAssert = require('truffle-assertions');
const exceptions = require ("../util/Exceptions");
const constants = require("../util/Constants");
const BN = require('bn.js');

contract('ReplicantFactoryWrapper', function(accounts) {

    let contract ;
    const sysAdmin = accounts[0];
    const tokenOwner = accounts[1];
    const minter = accounts[2];
    const anyone = accounts[3];
    const traits0 = new BN('1388469136269139274629418', 10);
    const traits1 = new BN('4835703422573704792572931', 10);
    const traits2 = new BN('59374701396491835636974613', 10);
    const traits3 = new BN('6044669605981521127212033', 10);
    const max_replicants = new BN(25200,10);
    const max_primes_per_series = new BN(5000,10);
    const max_promo_primes_per_gen = new BN(200,10);

    const replicant1 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "traits"     : traits0,
        "ranking"    : 12
    };

    const prime1 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.FEMALE,
        "series"     : constants.SERIES.ONE,
        "traits"     : traits2,
        "ranking"    : 33
    };

    before(async () => {
        // Get the contract instance for this suite
        contract = await ReplicantFactory.new();

        // Unpause the contract
        await contract.unpause();

        // Add the minter
        await contract.addMinter(minter);

    });

    it("should allow minter to create a replicant", async function() {

        const {generation, gender, traits, ranking} = replicant1;
        let id = new BN(0,10);
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

    it("should increase replicantCountByGeneration after minting a replicant", async function() {

        const {generation} = replicant1;
        let expected = new BN(1,10);

        // Check the count
        let result = await contract.replicantCountByGeneration(generation, {from: anyone});
        assert.ok(result.eq(expected));

    });

    it("should allow sysadmin setting of replicantCountByGeneration", async function() {

        const {generation} = replicant1;

        // Set the count
        await contract.setReplicantCount(generation, max_replicants, {from: sysAdmin});

        // Check the count
        let result = await contract.replicantCountByGeneration(generation,  {from: sysAdmin});
        assert.ok(result.eq(max_replicants));

    });

    it("should not allow minter to create more replicants than the capped amount", async function() {

        const {generation, gender, ranking} = replicant1;
        let traits = traits1;

        // Try to mint the replicant
        await exceptions.catchRevert(
            contract.mintReplicant(tokenOwner, traits, generation, gender, ranking, {from: minter})
        );

    });


    it("should allow minter to create a prime", async function() {

        const {generation, series, gender, traits, ranking} = prime1;
        let id = new BN(1,10);
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

    it("should increase primeCountByGenAndSeries after minting a prime", async function() {

        const {generation, series} = prime1;
        let expected = new BN(1,10);

        // Check the count
        let result = await contract.primeCountByGenAndSeries(generation, series, {from: minter});
        assert.ok(result.eq(expected));

    });

    it("should allow sysadmin setting of primeCountByGenAndSeries", async function() {

        const {generation, series} = prime1;

        // Set the count
        await contract.setPrimeCount(generation, series, max_primes_per_series, {from: sysAdmin});

        // Check the count
        let result = await contract.primeCountByGenAndSeries(generation, series, {from: sysAdmin});
        assert.ok(result.eq(max_primes_per_series));

    });

    it("should not allow minter to create more primes per series than the capped amount", async function() {

        const {generation, series, gender, ranking} = prime1;
        let traits = traits3;

        // Try to mint the prime
        await exceptions.catchRevert(
            contract.mintPrime(tokenOwner, traits, generation, series, gender, ranking, {from: minter})
        );

    });

    it("should not allow minter to create more promo primes per generation than the capped amount", async function() {

        const {generation, gender, ranking} = prime1;
        let traits = traits3;
        let series = constants.SERIES.PROMO;

        // Set the count
        await contract.setPrimeCount(generation, series, max_promo_primes_per_gen, {from: sysAdmin});

        // Check the count
        let result = await contract.primeCountByGenAndSeries(generation, series, {from: sysAdmin});
        assert.ok(result.eq(max_promo_primes_per_gen));

        // Try to mint the prime
        await exceptions.catchRevert(
            contract.mintPrime(tokenOwner, traits, generation, series, gender, ranking, {from: minter})
        );

    });

});