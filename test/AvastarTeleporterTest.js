const AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
const AvastarMetadata = artifacts.require("./AvastarMetadata.sol");
const truffleAssert = require('truffle-assertions');
const exceptions = require ("../util/Exceptions");
const constants = require("../util/Constants");
const traitData = require("./data/TraitData");
const traitMath = require("../util/TraitMath");

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
    const invalidID = new BN(50,10);

    const usedTraits = [
        true, false, true, true, false, true, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
    ];

    const attribution = {
        "generation": constants.GENERATION.ONE,
        "artist": "Marmota vs Milky",
        "infoURI": "https://www.twine.fm/marmotavsmilky"
    };

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
        "name": "Avastar #2",
        "description": "Generation 1 Series 1 Male Prime. Original art by: Marmota vs Milky (https://www.twine.fm/marmotavsmilky)",
        "external_url": "https://dev.avastars.io/avastar/2",
        "image": "https://dev.avastars.io/media/2",
        "attributes": [
            {
                "trait_type": "gender",
                "value": "male"
            },
            {
                "display_type": "number",
                "trait_type": "generation",
                "value": 1
            },
            {
                "display_type": "number",
                "trait_type": "series",
                "value": 1
            },
            {
                "display_type": "number",
                "trait_type": "serial",
                "value": 2
            },
            {
                "display_type": "number",
                "trait_type": "ranking",
                "value": 68
            },
            {
                "trait_type": "skin_tone",
                "value": "Pale Pink"
            },
            {
                "trait_type": "hair_color",
                "value": "Bleached Blonde"
            },
            {
                "trait_type": "eye_color",
                "value": "Bubbles"
            },
            {
                "trait_type": "background_color",
                "value": "Black White"
            },
            {
                "trait_type": "backdrop",
                "value": "Backdrop 11"
            },
            {
                "trait_type": "ears",
                "value": "Square"
            },
            {
                "trait_type": "face",
                "value": "Male Face 1"
            },
            {
                "trait_type": "nose",
                "value": "Fleshy"
            },
            {
                "trait_type": "mouth",
                "value": "Gimp Ball"
            },
            {
                "trait_type": "facial_feature",
                "value": "Tribal"
            },
            {
                "trait_type": "eyes",
                "value": "Normal"
            },
            {
                "trait_type": "hair_style",
                "value": "Manbun"
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
        await teleporter.setMetadataContractAddress(metadataContract.address);

        // Add the minter
        await teleporter.addMinter(minter);

        // Unpause the contracts
        await teleporter.unpause({from: sysAdmin});
        await metadataContract.unpause({from: sysAdmin});

        // Create prime3's full trait set
        const create = trait =>  teleporter.createTrait(trait.generation, trait.series, trait.gender, trait.gene, trait.rarity, trait.variation, trait.name, trait.svg, {from: sysAdmin, gas: constants.MAX_GAS});

        for (const trait of traitData.avastar){
            await create(trait);
        }

        // Set artist attribution
        await teleporter.setAttribution(attribution.generation, attribution.artist, attribution.infoURI, {from: sysAdmin});

        // Mint 3 primes
        const mint = prime => teleporter.mintPrime(tokenOwner, prime.traits, prime.generation, prime.series, prime.gender, prime.ranking, {from: minter});
        for (const prime of [prime1, prime2, prime3]) {
            await mint(prime);
        }

    });

    it("should not allow changing of attribution once avastars have been produced for a given generation", async function() {

        // Try to set attribution
        await exceptions.catchRevert(
            teleporter.setAttribution(attribution.generation, attribution.artist, attribution.infoURI, {from: sysAdmin})
        )

    });

    it("should not allow adding of traits once avastars have been produced for a given generation", async function() {

        // Try to add trait
        await exceptions.catchRevert(
            teleporter.createTrait(constants.GENERATION.ONE, [constants.SERIES.ONE], constants.GENDER.MALE, constants.GENE.NOSE, constants.RARITY.RARE, 1, "test trait", "<path fill='none/>", {from: sysAdmin, gas: constants.MAX_GAS})
        )

    });

    it("should not allow extending of trait art once avastars have been produced for a given generation", async function() {

        const id = new BN(0, 10);

        // Try to extend trait
        await exceptions.catchRevert(
            teleporter.extendTraitArt(id, "<path fill='none'/>", {from: sysAdmin, gas: constants.MAX_GAS})
        )

    });

    it("should allow anyone to retrieve the AvastarMetadata contract address", async function() {

        const expected = metadataContract.address;

        // Get the Avastar info
        const address = await teleporter.getMetadataContractAddress({from: stranger});

        // Test results
        assert.equal(address, expected, "Address wasn't correct");

    });

    it("should not allow system administrator to approve trait access for another user's primes", async function() {

        // Try to approve trait access
        await exceptions.catchRevert(
            teleporter.approveTraitAccess(sysAdmin, [id1, id2, id3], {from: sysAdmin})
        )

    });

    it("should not allow minter to approve trait access for another user's primes", async function() {

        // Try to approve trait access
        await truffleAssert.reverts(
            teleporter.approveTraitAccess(minter, [id1, id2, id3], {from: minter}),
            "Must be token owner"
        );

    });

    it("should not allow an unapproved stranger to use traits on a prime", async function() {

        const requestFlags = [false, true];

        await truffleAssert.reverts(
            teleporter.useTraits(id1, requestFlags, {from: stranger}),
            "Must be token owner or approved handler"
        );

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

        const requestFlags = usedTraits;
        const expected = JSON.stringify(usedTraits);

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

    it("should not allow an approved handler to set a previously used trait to unused", async function() {

        // Approve trait access
        await teleporter.approveTraitAccess(handler, [id1, id2, id3], {from: tokenOwner});

        // Previously used trait
        const requestFlags = [false];

        // Set previously used trait to unused
        await truffleAssert.reverts(
            teleporter.useTraits(id1, requestFlags, {from: handler}),
            "No reusable traits specified"
        );

    });

    it("should allow anyone to see a prime's replication flags reflect authorized usage", async function() {

        const expected = JSON.stringify(usedTraits);
        const result = await teleporter.getPrimeReplicationByTokenId(id1, {from: stranger});

        assert.ok(result[0].eq(id1), "Token ID field wasn't correct");
        assert.ok(JSON.stringify(result[1]) === expected, "Replication flags weren't correct");

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

        const expected = new BN(constants.WAVE.PRIME, 10);

        // Get the Avastar info
        const wave = await teleporter.getAvastarWaveByTokenId(id3, {from: stranger});

        // Test results
        assert.ok(wave.eq(expected), "Wave field wasn't correct");

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

    it("should allow anyone to retrieve the tokenURI for a given Avastar by Token ID", async function() {

        // Create expected value
        const expected = `${constants.TOKEN_URI_BASE.DEV}${id3.toNumber()}`;

        // Get the Avastar tokenURI
        const tokenURI = await teleporter.tokenURI(id3, {from: stranger});

        // Test results
        assert.equal(tokenURI, expected, "tokenURI wasn't correct");

    });

    it("should revert when trying to retrieve the tokenURI for an invalid Token ID", async function() {

        // Try to get tokenURI for invalid token ID
        await exceptions.catchRevert(
            metadataContract.tokenURI(invalidID, {from: stranger})
        );

    });

});