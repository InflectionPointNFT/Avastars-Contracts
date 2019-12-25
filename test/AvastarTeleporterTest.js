const AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
const AvastarMetadata = artifacts.require("./AvastarMetadata.sol");
const truffleAssert = require('truffle-assertions');
const exceptions = require ("./util/Exceptions");
const constants = require("./util/Constants");
const traitData = require("./util/TraitData");
const traitMath = require("./util/TraitMath");

const BN = require('bn.js');

contract('AvastarTeleporter', function(accounts) {

    let teleporter, metadataContract;
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

    const prime3Meta = {
        "description": "Avastar Prime",
        "external_url": "https://dev.avastars.io/avastar/2",
        "image": "https://dev.avastars.io/media/2",
        "attributes": [
            {
                "display_type": "number",
                "trait_type": "generation",
                "value": 1
            },
            {
                "display_type": "number",
                "trait_type": "series",
                "value": 1
            }
        ]
    };

    before(async () => {

        // Get the AvastarTeleporter contract instance for this suite
        teleporter = await AvastarTeleporter.new();

        // Deploy the metadata contract
        metadataContract = await AvastarMetadata.new(
            teleporter.address,
            constants.MEDIA_URI_BASE.DEV,
            constants.VIEW_URI_BASE.DEV,
            constants.TOKEN_URI_BASE.DEV
        );

        // Set the teleporter's reference to the metadata contract
        await teleporter.setMetadataContract(metadataContract.address);

        // Add the minter
        await teleporter.addMinter(minter);

        // Unpause the contracts
        await teleporter.unpause({from: sysAdmin});
        await metadataContract.unpause({from: sysAdmin});

        // Mint 3 primes
        const mint = prime => teleporter.mintPrime(tokenOwner, prime.traits, prime.generation, prime.series, prime.gender, prime.ranking, {from: minter});
        for (const prime of [prime1, prime2, prime3]) {
            await mint(prime);
        }

        // Create prime3's full trait set
        const create = trait =>  teleporter.createTrait(trait.generation, trait.series, trait.gender, trait.gene, trait.rarity, trait.variation, trait.name, trait.svg, {from: sysAdmin, gas: constants.MAX_GAS});

        for (const trait of traitData.avastar){
            await create(trait);
        }

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

    it("should allow anyone to retrieve the wave for a given Avastar by Token ID", async function() {

        // Get the Avastar info
        const wave = await teleporter.getAvastarWaveByTokenId(id3, {from: stranger});

        // Test results
        assert.equal(wave.toNumber(), constants.WAVE.PRIME, "Wave field wasn't correct");

    });

    it("should allow anyone to retrieve the tokenURI for a given Avastar by Token ID", async function() {

        // Create expected value
        const expected = `${constants.TOKEN_URI_BASE.DEV}${id3.toNumber()}`;

        // Get the Avastar tokenURI
        const tokenURI = await teleporter.tokenURI(id3, {from: stranger});

        // Test results
        assert.equal(tokenURI, expected, "tokenURI wasn't correct");

    });

    it("should allow anyone to retrieve the mediaURI for a given Avastar by Token ID", async function() {

        // Create expected value
        const expected = `${constants.MEDIA_URI_BASE.DEV}${id3.toNumber()}`;

        // Get the Avastar tokenURI
        const mediaURI = await teleporter.mediaURI(id3, {from: stranger});

        // Test results
        assert.equal(mediaURI, expected, "mediaURI wasn't correct");

    });

    it("should allow anyone to retrieve the viewURI for a given Avastar by Token ID", async function() {

        // Create expected value
        const expected = `${constants.VIEW_URI_BASE.DEV}${id3.toNumber()}`;

        // Get the Avastar tokenURI
        const viewURI = await teleporter.viewURI(id3, {from: stranger});

        // Test results
        assert.equal(viewURI, expected, "viewURI wasn't correct");

    });

    it("should allow anyone to get the metadata for an avastar", async function() {

        // Get the metadata
        let result = await teleporter.getAvastarMetadata(id3, {from: stranger});

        // Parse into an object
        let meta = JSON.parse(result);

        // Test results
        assert.equal(meta.description, prime3Meta.description, "description field wasn't correct");
        assert.equal(meta.external_url,  prime3Meta.external_url, "external_url field wasn't correct");
        assert.equal(meta.image,  prime3Meta.image, "image field wasn't correct");

    });

    it("should allow anyone to render the art for a given Avastar", async function() {

        // Has to be tested here rather than in AvastarFactoryTest because
        // mintPrime and mintReplicant functions set primes and replicants into mappings
        // read by renderAvastar

        // Compute the expected result
        const expected = traitMath.computeArt(traitData.avastar);

        // Get the rendered artwork
        const art = await teleporter.renderAvastar(id3, {from: stranger});

        // Make certain the assembled art is as expected
        assert.equal(art, expected, "Assembled art wasn't correct");

    });

});