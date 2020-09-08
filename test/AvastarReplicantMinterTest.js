const AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
const AvastarReplicantMinter = artifacts.require("./AvastarReplicantMinter.sol");

const truffleAssert = require('truffle-assertions');
const truffleEvent  = require('../util/truffle-events');
const exceptions = require ("../util/Exceptions");
const constants = require("../util/Constants");
const BN = require('bn.js');

contract('AvastarReplicantMinter', function(accounts) {

    let teleporterContract, replicantMinterContract;
    const sysAdmin = accounts[0];  // ART contract owner
    const purchaser = accounts[1]; // token owner
    const minter = accounts[2];    // minter role
    const spender = accounts[3];   // approved address
    const anyone = accounts[4];    // anyone else

    const none = new BN('0', 10);
    const decimals = new BN('18', 10);
    const scaleFactor = new BN('10', 10).pow(decimals);

    const traits1 = new BN('4835703422573704792572931', 10);
    const traits2 = new BN('59374701396491835636974613', 10);
    const traits3 = new BN('6044669605981521127212033', 10);
    const traits4 = new BN('16442623851008461074068800773', 10);

    const bulkPrimeIds = [0,1];
    const mixedIds = [0,1,2,3];
    const lonePrimeId = 2;
    const replicantId = 3;


    const primes = [
        // Prime 1 - id 0
        {
            "generation" : constants.GENERATION.ONE,
            "gender"     : constants.GENDER.MALE,
            "series"     : constants.SERIES.ONE,
            "traits"     : traits1,
            "ranking"    : 33,
        },
        // Prime 2 - id 1
        {
            "generation" : constants.GENERATION.ONE,
            "gender"     : constants.GENDER.FEMALE,
            "series"     : constants.SERIES.ONE,
            "traits"     : traits2,
            "ranking"    : 46,
        },
        // Prime 3 - id 2
        {
            "generation" : constants.GENERATION.ONE,
            "gender"     : constants.GENDER.MALE,
            "series"     : constants.SERIES.TWO,
            "traits"     : traits3,
            "ranking"    : 68,
        }
    ];

    const replicant = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "traits"     : traits4,
        "ranking"    : 25,
    };

    before(async () => {

        // Create the contracts
        teleporterContract = await AvastarTeleporter.new();
        replicantMinterContract = await AvastarReplicantMinter.new();

        // Setup and unpause teleporter contract
        await teleporterContract.addMinter(minter);
        await teleporterContract.addMinter(replicantMinterContract.address);
        await teleporterContract.unpause();

        // Setup and unpause Replicant minter contract
        replicantMinterContract.addMinter(minter);
        replicantMinterContract.setTeleporterContract(teleporterContract.address);
        await replicantMinterContract.unpause();

        // Mint the primes for testing
        for (let i = 0; i < primes.length; i++)
        {
            const {traits, generation, series, gender, ranking} = primes[i];
            await teleporterContract.mintPrime(purchaser, traits, generation, series, gender, ranking, {from: minter});
        }

    });

    it("should not mint a replicant for the purchaser if their ART tokens have not been claimed", async function() {
        const {generation, gender, traits, ranking} = replicant;

        // Attempt unfunded purchase
        await exceptions.catchRevert(
            replicantMinterContract.purchaseReplicant(purchaser, traits, generation, gender, ranking, {from: minter})
        );

    });

    it("should mint a replicant for the purchaser once their ART tokens have been claimed", async function() {

        // Claim the art for the already minted primes
        await replicantMinterContract.claimArtBulk(purchaser, bulkPrimeIds, {from: sysAdmin});

        // Mint one replicant for testing
        const {generation, gender, traits, ranking} = replicant;
        const result = await replicantMinterContract.purchaseReplicant(purchaser, traits, generation, gender, ranking, {from: minter});

        // Get events emitted from the factory
        let factoryScope = truffleEvent.formTxObject('AvastarTeleporter', 3, result);

        // Test that NewReplicant event was emitted
        truffleAssert.eventEmitted(factoryScope, 'NewReplicant', (ev) => {
            return (
                ev.generation === String(generation) &&
                ev.gender === String(gender) &&
                ev.traits === String(traits)
            );
        }, 'NewReplicant event should be emitted with correct info');

    });

    it("should not allow anyone other than sysadmin to claim a Prime holder's ART tokens in bulk", async function() {

        // Attempt invalid claim from someone other than owner
        await exceptions.catchRevert(
            replicantMinterContract.claimArtBulk(purchaser, bulkPrimeIds, {from: anyone})
        );

    });

    it("should not allow anyone other than a minter to claim a Prime holder's lone ART token", async function() {

        // Attempt invalid claim from someone other than owner
        await exceptions.catchRevert(
            replicantMinterContract.claimArt(purchaser, lonePrimeId, {from: anyone})
        );

    });

    it("should not allow a replicant id to be specified when claiming ART tokens in bulk", async function() {

        // Attempt invalid claim with a replicant id included
        await exceptions.catchRevert(
            replicantMinterContract.claimArtBulk(purchaser, mixedIds, {from: sysAdmin})
        );

    });

    it("should not allow a replicant id to be specified when claiming lone ART tokens", async function() {

        // Attempt invalid claim with a replicant id included
        await exceptions.catchRevert(
            replicantMinterContract.claimArt(purchaser, replicantId, {from: minter})
        );

    });

    it("should allow a minter to claim lone ART tokens for a Prime owner", async function() {

        const expected = new BN('1',10);

        // Claim ART for the owned primes
        const result = await replicantMinterContract.claimArt(purchaser, lonePrimeId, {from: minter});

        // Test that a ARTMinted event was emitted
        truffleAssert.eventEmitted(result, 'ARTMinted', (ev) => {
            return (
                ev.holder === purchaser &&
                ev.amount.eq(expected)
            );
        }, 'ARTMinted event should be emitted with correct info');

    });

    it("should only allow one ART token to be claimed for each Prime in bulk", async function() {

        // Attempt claiming primes again
        await exceptions.catchRevert(
            replicantMinterContract.claimArtBulk(purchaser, bulkPrimeIds, {from: sysAdmin})
        );

    });

    it("should not allow one ART token to be claimed for previously claimed lone Primes", async function() {

        // Attempt claiming prime again
        await exceptions.catchRevert(
            replicantMinterContract.claimArt(purchaser, lonePrimeId, {from: minter})
        );

    });

    it("should show the correct balance for a token holder", async function() {

        const expected = new BN('2', 10).mul(scaleFactor);

        // Claim the primes for ART
        const result = await replicantMinterContract.balanceOf(purchaser);
        assert.ok(result.eq(expected), "Balance amount was not correct");

    });

    it("should reflect newly minted tokens in circulation", async function() {
        const expectedAmount = new BN('2', 10);

        // Claim the primes for ART
        const result = await replicantMinterContract.getCirculatingArt();
        assert.ok(result.eq(expectedAmount), "Circulation amount was not correct");

    });

});