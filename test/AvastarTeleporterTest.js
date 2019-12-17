const AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
const truffleAssert = require('truffle-assertions');
const exceptions = require ("./util/Exceptions");
const constants = require("./util/Constants");
const traitData = require("./util/TraitData");
const traitMath = require("./util/TraitMath");

const BN = require('bn.js');

contract('AvastarTeleporter', function(accounts) {

    let teleporter;
    const sysAdmin = accounts[0];
    const tokenOwner = accounts[1];
    const minter = accounts[2];
    const handler = accounts[3];
    const stranger = accounts[4];
    const traits1 = new BN('4835703422573704792572931', 10);
    const traits2 = new BN('59374701396491835636974613', 10);
    const traits3 = traitMath.computeHash(traitData.avastar);
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
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.ONE,
        "traits"     : traits3,
        "ranking"    : 68
    };

    before(async () => {

        // Get the AvastarTeleporter contract instance for this suite
        teleporter = await AvastarTeleporter.new();

        // Set the teleporter's reference to the metadata contract
        await teleporter.setTokenUriBase(constants.TOKEN_URI_BASE.DEV);

        // Unpause the contract
        await teleporter.unpause({from: sysAdmin});

        // Add the minter
        await teleporter.addMinter(minter);

        // Mint 3 primes
        const mint = prime => teleporter.mintPrime(tokenOwner, prime.traits, prime.generation, prime.series, prime.gender, prime.ranking, {from: minter});
        await mint(prime1);
        await mint(prime2);
        await mint(prime3);

        // Create prime3's full trait set
        const create = trait =>  teleporter.createTrait(trait.generation, trait.series, trait.gender, trait.gene, trait.rarity, trait.variation, trait.name, trait.svg, {from: sysAdmin, gas: constants.MAX_GAS});
        await create(traitData.avastar[0]);
        await create(traitData.avastar[1]);
        await create(traitData.avastar[2]);
        await create(traitData.avastar[3]);
        await create(traitData.avastar[4]);
        await create(traitData.avastar[5]);
        await create(traitData.avastar[6]);
        await create(traitData.avastar[7]);
        await create(traitData.avastar[8]);
        await create(traitData.avastar[9]);
        await create(traitData.avastar[10]);

    });

    it("should not allow system administrator to approve trait access for another user's primes", async function() {

        // Try to approve trait access
        await exceptions.catchRevert(
            teleporter.approveTraitAccess(sysAdmin, [id1, id2, id3], {from: sysAdmin})
        )

    });

    it("should not allow minter to approve trait access for another user's primes", async function() {

        // Try to approve trait access
        await exceptions.catchRevert(
            teleporter.approveTraitAccess(minter, [id1, id2, id3], {from: minter})
        )

    });

    it("should not allow an unapproved stranger to use traits on a prime", async function() {

        const requestFlags = [false, true];

        // Try to use traits
        await exceptions.catchRevert(
            teleporter.useTraits(id1, requestFlags, {from: stranger})
        )

    });

    it("should allow owner to approve trait access for a specific set of their primes", async function() {

        // Try to approve trait access
        let result = await teleporter.approveTraitAccess(handler, [id1, id2, id3], {from: tokenOwner});

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
        let result = await teleporter.useTraits(id1, requestFlags, {from: handler});

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
            teleporter.useTraits(id1, requestFlags, {from: handler})
        )

    });

    it("should allow anyone to render the art for a given Avastar", async function() {

        // Compute the expected result
        const expected = traitMath.computeArt(traitData.avastar);

        // Get the rendered artwork
        const art = await teleporter.renderAvastar(id3, {from: stranger});

        // Make certain the assembled art is as expected
        assert.equal(art, expected, "Assembled art wasn't correct");

    });

    it("should not allow system administrator to change the token URI base when contract is not paused", async function() {

        // Try to change token URI base
        await exceptions.catchRevert(
            teleporter.setTokenUriBase(constants.TOKEN_URI_BASE.TEST, {from: sysAdmin})
        )

    });


    it("should allow the sysadmin to change the token URI base when contract is paused", async function() {

        // Pause the contract
        await teleporter.pause();

        // Set the token URI base
        let result = await teleporter.setTokenUriBase(constants.TOKEN_URI_BASE.TEST, {from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'TokenUriBaseSet', (ev) => {
            return (
                ev.tokenUriBase === constants.TOKEN_URI_BASE.TEST
            );
        }, 'TokenUriBaseSet event should be emitted with correct info');

        // Unpause the contract
        await teleporter.unpause();

        // The expected tokenURI
        const expected = `${constants.TOKEN_URI_BASE.TEST}1`;

        // Request tokenURI for Token ID 2
        result = await teleporter.tokenURI(id2, {from: stranger});

        // Test result
        assert.equal(result, expected, "TokenURI wasn't correct");
    })


});