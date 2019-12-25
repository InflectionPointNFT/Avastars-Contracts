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
        "external_url": "https://test.avastars.io/avastar/2",
        "image": "https://test.avastars.io/media/2",
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

    it("should allow anyone to get the metadata for an avastar", async function() {

        // Get the metadata
        let result = await metadataContract.getAvastarMetadata(id3, {from: stranger});

        // Parse into an object
        let meta = JSON.parse(result);

        // Test results
        assert.equal(meta.description, prime3Meta.description, "description field wasn't correct");
        assert.equal(meta.external_url,  prime3Meta.external_url, "external_url field wasn't correct");
        assert.equal(meta.image,  prime3Meta.image, "image field wasn't correct");


    });

});