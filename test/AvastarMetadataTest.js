const AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
const AvastarMetadata = artifacts.require("./AvastarMetadata.sol");
const truffleAssert = require('truffle-assertions');
const exceptions = require ("./util/Exceptions");
const constants = require("./util/Constants");
const traitData = require("./util/TraitData");
const traitMath = require("./util/TraitMath");

const BN = require('bn.js');

contract('AvastarMetadata', function(accounts) {

    let teleporter, metadataContract;
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
    const id4 = new BN(3,10);
    const invalidID = new BN(50,10);

    const attribution1 = {
        "generation": constants.GENERATION.ONE,
        "artist": "Marmota vs Milky",
        "infoURI": "https://www.twine.fm/marmotavsmilky"
    };

    const attribution2 = {
        "generation": constants.GENERATION.TWO,
        "artist": "John Orion Young",
        "infoURI": "https://www.joy.lol/"
    };

    const replicant1 = {
        "generation" : constants.GENERATION.TWO,
        "gender"     : constants.GENDER.MALE,
        "traits"     : traits3,
        "ranking"    : 76
    };

    const prime1 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.PROMO,
        "traits"     : traits1,
        "ranking"    : 33
    };

    const prime2 = {
        "generation" : constants.GENERATION.TWO,
        "gender"     : constants.GENDER.FEMALE,
        "series"     : constants.SERIES.TWO,
        "traits"     : traits2,
        "ranking"    : 46
    };

    const prime3 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.PROMO,
        "traits"     : traits3,
        "ranking"    : 68
    };

    const prime3Meta = {
        "name": "Avastar #2",
        "description": "Generation 1 Male Founder. Original art by: Marmota vs Milky (https://www.twine.fm/marmotavsmilky)",
        "external_url": "https://test.avastars.io/avastar/2",
        "image": "https://test.avastars.io/media/2",
        "attributes": [
            {
                "trait_type": "gender",
                "value": "male"
            },
            {
                "trait_type": "wave",
                "value": "prime"
            },
            {
                "display_type": "number",
                "trait_type": "generation",
                "value": 1
            },
            {
                "display_type": "number",
                "trait_type": "series",
                "value": 0
            },
            {
                "display_type": "number",
                "trait_type": "serial",
                "value": 1
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

    const replicant1Meta = {
        "name": "Avastar #3",
        "description": "Generation 2 Male Replicant. Original art by: John Orion Young (https://www.joy.lol/)",
        "external_url": "https://test.avastars.io/avastar/3",
        "image": "https://test.avastars.io/media/3",
        "attributes": [
            {
                "trait_type": "gender",
                "value": "male"
            },
            {
                "trait_type": "wave",
                "value": "replicant"
            },
            {
                "display_type": "number",
                "trait_type": "generation",
                "value": 2
            },
            {
                "display_type": "number",
                "trait_type": "serial",
                "value": 0
            },
            {
                "display_type": "number",
                "trait_type": "ranking",
                "value": 76
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
        const replicate = trait =>  teleporter.createTrait(replicant1.generation, trait.series, trait.gender, trait.gene, trait.rarity, trait.variation, trait.name, trait.svg, {from: sysAdmin, gas: constants.MAX_GAS});
        for (const trait of traitData.avastar){
            await create(trait);
            await replicate(trait);
        }

        // Set artist attribution
        await teleporter.setAttribution(attribution1.generation, attribution1.artist, attribution1.infoURI, {from: sysAdmin});
        await teleporter.setAttribution(attribution2.generation, attribution2.artist, attribution2.infoURI, {from: sysAdmin});

        // Mint 3 primes
        const mint = prime => teleporter.mintPrime(tokenOwner, prime.traits, prime.generation, prime.series, prime.gender, prime.ranking, {from: minter});
        for (const prime of [prime1, prime2, prime3]) {
            await mint(prime);
        }

        // Mint 1 replicant
        await teleporter.mintReplicant(tokenOwner, replicant1.traits, replicant1.generation, replicant1.gender, replicant1.ranking, {from: minter});

    });

    it("should not allow non-sysadmins to change the token URI base regardless of contract pause state", async function() {

        // Try to change token URI base while unpaused
        await exceptions.catchRevert(
            metadataContract.setTokenUriBase(constants.TOKEN_URI_BASE.TEST, {from: stranger})
        );

        // Pause the contract
        await metadataContract.pause();

        // Try to change token URI base while unpaused
        await exceptions.catchRevert(
            metadataContract.setTokenUriBase(constants.TOKEN_URI_BASE.TEST, {from: stranger})
        );

        // Pause the contract
        await metadataContract.unpause();


    });

    it("should not allow system administrator to change the token URI base when contract is not paused", async function() {

        // Try to change token URI base
        await exceptions.catchRevert(
            metadataContract.setTokenUriBase(constants.TOKEN_URI_BASE.TEST, {from: sysAdmin})
        )

    });

    it("should allow the sysadmin to change the token URI base when contract is paused", async function() {

        // Pause the contract
        await metadataContract.pause();

        // Set the token URI base
        let result = await metadataContract.setTokenUriBase(constants.TOKEN_URI_BASE.TEST, {from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'TokenUriBaseSet', (ev) => {
            return (
                ev.tokenUriBase === constants.TOKEN_URI_BASE.TEST
            );
        }, 'TokenUriBaseSet event should be emitted with correct info');

        // Unpause the contract
        await metadataContract.unpause();

        // The expected tokenURI
        const expected = `${constants.TOKEN_URI_BASE.TEST}1`;

        // Request tokenURI for Token ID 2
        result = await metadataContract.tokenURI(id2, {from: stranger});

        // Test result
        assert.equal(result, expected, "TokenURI wasn't correct");
    });

    it("should not allow non-sysadmins to change the media URI base regardless of contract pause state", async function() {

        // Try to change media URI base while unpaused
        await exceptions.catchRevert(
            metadataContract.setMediaUriBase(constants.MEDIA_URI_BASE.TEST, {from: stranger})
        );

        // Pause the contract
        await metadataContract.pause();

        // Try to change media URI base while unpaused
        await exceptions.catchRevert(
            metadataContract.setMediaUriBase(constants.MEDIA_URI_BASE.TEST, {from: stranger})
        );

        // Pause the contract
        await metadataContract.unpause();


    });

    it("should not allow system administrator to change the media URI base when contract is not paused", async function() {

        // Try to change media URI base
        await exceptions.catchRevert(
            metadataContract.setMediaUriBase(constants.MEDIA_URI_BASE.TEST, {from: sysAdmin})
        )

    });

    it("should allow the sysadmin to change the media URI base when contract is paused", async function() {

        // Pause the contract
        await metadataContract.pause();

        // Set the token URI base
        let result = await metadataContract.setMediaUriBase(constants.MEDIA_URI_BASE.TEST, {from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'MediaUriBaseSet', (ev) => {
            return (
                ev.mediaUriBase === constants.MEDIA_URI_BASE.TEST
            );
        }, 'MediaUriBaseSet event should be emitted with correct info');

        // Unpause the contract
        await metadataContract.unpause();

        // The expected tokenURI
        const expected = `${constants.MEDIA_URI_BASE.TEST}${id2.toNumber()}`;

        // Request tokenURI for Token ID 2
        result = await metadataContract.mediaURI(id2, {from: stranger});

        // Test result
        assert.equal(result, expected, "TokenURI wasn't correct");
    });

    it("should not allow non-sysadmins to change the media URI base regardless of contract pause state", async function() {

        // Try to change view URI base while unpaused
        await exceptions.catchRevert(
            metadataContract.setViewUriBase(constants.VIEW_URI_BASE.TEST, {from: stranger})
        );

        // Pause the contract
        await metadataContract.pause();

        // Try to change media URI base while unpaused
        await exceptions.catchRevert(
            metadataContract.setViewUriBase(constants.VIEW_URI_BASE.TEST, {from: stranger})
        );

        // Pause the contract
        await metadataContract.unpause();

    });

    it("should not allow system administrator to change the view URI base when contract is not paused", async function() {

        // Try to change media URI base
        await exceptions.catchRevert(
            metadataContract.setViewUriBase(constants.VIEW_URI_BASE.TEST, {from: sysAdmin})
        )

    });

    it("should allow the sysadmin to change the view URI base when contract is paused", async function() {

        // Pause the contract
        await metadataContract.pause();

        // Set the token URI base
        let result = await metadataContract.setViewUriBase(constants.VIEW_URI_BASE.TEST, {from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'ViewUriBaseSet', (ev) => {
            return (
                ev.viewUriBase === constants.VIEW_URI_BASE.TEST
            );
        }, 'ViewUriBaseSet event should be emitted with correct info');

        // Unpause the contract
        await metadataContract.unpause();

        // The expected tokenURI
        const expected = `${constants.VIEW_URI_BASE.TEST}${id2.toNumber()}`;

        // Request tokenURI for Token ID 2
        result = await metadataContract.viewURI(id2, {from: stranger});

        // Test result
        assert.equal(result, expected, "viewURI wasn't correct");
    });

    it("should allow anyone to retrieve the tokenURI for a given Avastar by Token ID", async function() {

        // Create expected value
        const expected = `${constants.TOKEN_URI_BASE.TEST}${id3.toNumber()}`;

        // Get the Avastar tokenURI
        const tokenURI = await metadataContract.tokenURI(id3, {from: stranger});

        // Test results
        assert.equal(tokenURI, expected, "tokenURI wasn't correct");

    });

    it("should revert when trying to retrieve the tokenURI for an invalid Token ID", async function() {

        // Try to get tokenURI for invalid token ID
        await exceptions.catchRevert(
            metadataContract.tokenURI(invalidID, {from: stranger})
        );

    });

    it("should allow anyone to retrieve the mediaURI for a given Avastar by Token ID", async function() {

        // Create expected value
        const expected = `${constants.MEDIA_URI_BASE.TEST}${id3.toNumber()}`;

        // Get the Avastar tokenURI
        const mediaURI = await metadataContract.mediaURI(id3, {from: stranger});

        // Test results
        assert.equal(mediaURI, expected, "mediaURI wasn't correct");

    });

    it("should revert when trying to retrieve the mediaURI for an invalid Token ID", async function() {

        // Try to get mediaURI for invalid token ID
        await exceptions.catchRevert(
            metadataContract.mediaURI(invalidID, {from: stranger})
        );

    });

    it("should allow anyone to retrieve the viewURI for a given Avastar by Token ID", async function() {

        // Create expected value
        const expected = `${constants.VIEW_URI_BASE.TEST}${id3.toNumber()}`;

        // Get the Avastar tokenURI
        const viewURI = await metadataContract.viewURI(id3, {from: stranger});

        // Test results
        assert.equal(viewURI, expected, "viewURI wasn't correct");

    });

    it("should revert when trying to retrieve the viewURI for an invalid Token ID", async function() {

        // Try to get viewURI for invalid token ID
        await exceptions.catchRevert(
            metadataContract.viewURI(invalidID, {from: stranger})
        );

    });


    it("should allow anyone to get the metadata for an avastar prime", async function() {

        // Get the metadata
        let result = await metadataContract.getAvastarMetadata(id3, {from: stranger});

        // Parse into an object
        let meta = JSON.parse(result);

        // Test results
        assert.equal(meta.description, prime3Meta.description, "description field wasn't correct");
        assert.equal(meta.external_url,  prime3Meta.external_url, "external_url field wasn't correct");
        assert.equal(meta.image,  prime3Meta.image, "image field wasn't correct");
        prime3Meta.attributes.forEach( (attribute,index) => {
            assert.equal(meta.attributes[index]['trait_type'],  attribute['trait_type'], `trait_type field wasn't correct for attribute ${index}`);
            assert.equal(meta.attributes[index]['value'],  attribute['value'], `value field wasn't correct for attribute ${index}`);
        })

    });

    it("should allow anyone to get the metadata for an avastar replicant", async function() {

        // Get the metadata
        let result = await metadataContract.getAvastarMetadata(id4, {from: stranger});

        // Parse into an object
        let meta = JSON.parse(result);

        // Test results
        assert.equal(meta.description, replicant1Meta.description, "description field wasn't correct");
        assert.equal(meta.external_url, replicant1Meta.external_url, "external_url field wasn't correct");
        assert.equal(meta.image,  replicant1Meta.image, "image field wasn't correct");
        replicant1Meta.attributes.forEach( (attribute,index) => {
            assert.equal(meta.attributes[index]['trait_type'],  attribute['trait_type'], `trait_type field wasn't correct for attribute ${index}`);
            assert.equal(meta.attributes[index]['value'],  attribute['value'], `value field wasn't correct for attribute ${index}`);
        })

    });

    it("should revert when trying to retrieve the metadata for an invalid Token ID", async function() {

        // Try to get avastar metadata for invalid token ID
        await exceptions.catchRevert(
            metadataContract.getAvastarMetadata(invalidID, {from: stranger})
        );

    });


});