const AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
const AvastarReplicantToken = artifacts.require("./AvastarReplicantToken.sol");
const AvastarReplicantMinter = artifacts.require("./AvastarReplicantMinter.sol");

const truffleAssert = require('truffle-assertions');
const truffleEvent  = require('../util/truffle-events');
const exceptions = require ("../util/Exceptions");
const constants = require("../util/Constants");
const BN = require('bn.js');

contract('AvastarReplicantToken', function(accounts) {

    let teleporterContract, replicantMinterContract, artContract;
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

    const bulkPrimeIds = [0,1,2];

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
        artContract = await AvastarReplicantToken.new();
        replicantMinterContract = await AvastarReplicantMinter.new();

        // Setup and unpause teleporter contract
        await teleporterContract.addMinter(minter);
        await teleporterContract.addMinter(replicantMinterContract.address);
        await teleporterContract.unpause();

        // Setup and unpause ART contract
        artContract.setTeleporterContract(teleporterContract.address);
        artContract.setReplicantMinterContract(replicantMinterContract.address);
        await artContract.addMinter(minter);
        await artContract.unpause();

        // Setup and unpause Replicant minter contract
        replicantMinterContract.setArtContract(artContract.address);
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

        // Current allowance for replicant minter contract of the purchaser's tokens should be none
        let allowance = await artContract.allowance(purchaser, replicantMinterContract.address);
        assert.ok(allowance.eq(none));

        // Claim the art for the already minted primes
        await artContract.claimArtBulk(purchaser, bulkPrimeIds, allowance, {from: sysAdmin});

        // Allowance should now be 3
        allowance = await artContract.allowance(purchaser, replicantMinterContract.address);
        const tokens = allowance.div(scaleFactor).toNumber();
        assert.equal(tokens, 3);

        // Mint one replicant for testing
        const {generation, gender, traits, ranking} = replicant;
        const result = await replicantMinterContract.purchaseReplicant(purchaser, traits, generation, gender, ranking, {from: minter});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewReplicant', (ev) => {
            return (
                ev.generation.toNumber() === generation &&
                ev.gender.toNumber() === gender &&
                ev.traits.eq(traits)
            );
        }, 'NewReplicant event should be emitted with correct info');

    });

});