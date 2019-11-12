const AvastarTransporter = artifacts.require("./AvastarTransporter.sol");
const truffleAssert = require('truffle-assertions');
const exceptions = require ("./util/Exceptions");
const constants = require("./util/Constants");
const BN = require('bn.js');

contract('AvastarTransporter', function(accounts) {

    let transporter, result;
    const sysAdmin = accounts[0];
    const tokenOwner = accounts[1];
    const minter = accounts[2];
    const handler = accounts[3];
    const traits1 = new BN('4835703422573704792572931', 10);
    const traits2 = new BN('59374701396491835636974613', 10);
    const traits3 = new BN('6044669605981521127212033', 10);
    const id1 = new BN(0,10);
    const id2 = new BN(1,10);
    const id3 = new BN(2,10);

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

    before(async () => {

        // Get the contract instance for this suite
        transporter = await AvastarTransporter.new();

        // Unpause the contract
        await transporter.unpause();

        // Add the minter
        await transporter.addMinter(minter);

        // Mint 3 primes
        const mint = prime => transporter.mintPrime(tokenOwner, prime.traits, prime.generation, prime.series, prime.gender, prime.ranking, {from: minter});
        await mint(prime1);
        await mint(prime2);
        await mint(prime3);

    });

    it("should not allow system administrator to approve trait access for another user's primes", async function() {

        // Try to approve trait access
        await exceptions.catchRevert(
            transporter.approveTraitAccess(sysAdmin, [id1, id2, id3], {from: sysAdmin})
        )

    });

    it("should not allow minter to approve trait access for another user's primes", async function() {

        // Try to approve trait access
        await exceptions.catchRevert(
            transporter.approveTraitAccess(minter, [id1, id2, id3], {from: minter})
        )

    });

    it("should allow owner to approve trait access for a specific set of their primes", async function() {

        // Try to approve trait access
        let result = await transporter.approveTraitAccess(handler, [id1, id2, id3], {from: tokenOwner});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'TraitAccessApproved', (ev) => {
            return (
                ev.handler === handler &&
                ev.primeIds[0].eq(id1) &&
                ev.primeIds[1].eq(id2) &&
                ev.primeIds[2].eq(id3)

            );
        }, 'TraitAccessApproved event should be emitted with correct info');

    });

    it("should allow a handler to use traits for primes they are approved for", async function() {

        const requestFlags = [true];
        const expected = JSON.stringify([
            true, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false,
        ]);

        // Try to use traits
        let result = await transporter.useTraits(id1, requestFlags, {from: handler});

        // Test that appropriate event was emitted //TraitsUsed(address indexed handler, uint256 primeId, bool[] replicated);
        truffleAssert.eventEmitted(result, 'TraitsUsed', (ev) => {
            return (
                ev.handler === handler &&
                ev.primeId.eq(id1) &&
                JSON.stringify(ev.used) === expected
            );
        }, 'TraitsUsed event should be emitted with correct info');

    });

    it("should not allow a handler to use more traits on a prime without being approved again", async function() {

        const requestFlags = [false, true];

        // Try to use traits
        await exceptions.catchRevert(
            transporter.useTraits(id1, requestFlags, {from: handler})
        )

    });



});
