const AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
const AvastarReplicantToken = artifacts.require("./AvastarReplicantToken.sol");
const AvastarReplicantMinter = artifacts.require("./AvastarReplicantMinter.sol");

const truffleAssert = require('truffle-assertions');
const truffleEvent  = require('../util/truffle-events');
const exceptions = require ("../util/Exceptions");
const constants = require("../util/Constants");
const BN = require('bn.js');

contract('AvastarReplicantMinter', function(accounts) {

    let teleporterContract, minterContract, artContract;
    const sysAdmin = accounts[0];  // minter contract admin, ART contract owner
    const purchaser = accounts[1];
    const minter = accounts[2]; // account invoking minter contract must also have minter role
    const owner = accounts[3];  // minter contract owner
    const anyone = accounts[4];

    const traits1 = new BN('4835703422573704792572931', 10);
    const traits2 = new BN('59374701396491835636974613', 10);
    const traits3 = new BN('6044669605981521127212033', 10);

    const traits4 = new BN('16442623851008461074068800773', 10);
    const traits5 = new BN('2826487603661154200022484230', 10);
    const traits6 = new BN('3444253402627275361639272707', 10);

    const primeIds = [0,1,2];
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

    const replicants = [
        // Replicant 1 - id 4
        {
            "generation" : constants.GENERATION.ONE,
            "gender"     : constants.GENDER.MALE,
            "traits"     : traits4,
            "ranking"    : 25,
        },
        // Replicant 2 - id 5
        {
            "generation" : constants.GENERATION.ONE,
            "gender"     : constants.GENDER.FEMALE,
            "traits"     : traits5,
            "ranking"    : 36,
        },
        // Replicant 3 - id 6
        {
            "generation" : constants.GENERATION.ONE,
            "gender"     : constants.GENDER.MALE,
            "traits"     : traits6,
            "ranking"    : 75,
        }
    ];

    before(async () => {
        // Create the factory contract and unpause
        teleporterContract = await AvastarTeleporter.new();

        // Create the minter contract and set the factory contract
        minterContract = await AvastarReplicantMinter.new(teleporterContract.address);
        await minterContract.setTeleporterContract(teleporterContract.address);
        await minterContract.addMinter(minter);
        await minterContract.addOwner(owner);
        await minterContract.unpause();

        // Add the minters to the factory contract
        await teleporterContract.addMinter(minterContract.address);
        await teleporterContract.addMinter(minter);
        await teleporterContract.unpause();

        // Add the teleporter to the ART contract
        artContract = await AvastarReplicantToken.new();
        artContract.setTeleporterContract(teleporterContract.address);

        // Mint the primes for testing
        for (let i = 0; i < primes.length; i++)
        {
            const {traits, generation, series, gender, ranking} = primes[i];
            await teleporterContract.mintPrime(purchaser, traits, generation, series, gender, ranking, {from: minter});
        }

        // Claim the primes for ART
        await artContract.claimArt(primeIds, {from: purchaser});

    });

    xit("should not allow minter to purchase a replicant if AvastarTeleporter.mintReplicant reverts", async function() {

        const {generation, gender, traits} = replicants[0];
        const ranking = 0;

        // Called function on teleporter reverts because ranking must be between 1 and 100
        // Try to purchase the prime
        await exceptions.catchRevert(
            minterContract.purchaseReplicant(owner, traits, generation, gender, ranking, {from: minter})
        )

    });

    xit("should allow minter to purchase a replicant if purchaser has set allowance to for minter contract ", async function() {

        const {generation, gender, traits} = replicants[0];
        let id = new BN(0,10);
        let serial = new BN(0,10);

        // 1 ETH was previously deposited in contract
        // Purchase the prime
        let result = await minterContract.purchasePrime(purchaser, price, traits, gender, ranking, {from: minter});

        // Test that a DepositorBalance event was emitted
        truffleAssert.eventEmitted(result, 'DepositorBalance', (ev) => {
            return (
                ev.depositor === purchaser &&
                ev.balance.eq(depositAfterOne)
            );
        }, 'DepositorBalance event should be emitted with correct info');

        // Get events emitted from the factory
        let factoryScope = truffleEvent.formTxObject('AvastarTeleporter', 1, result);

        // Test that appropriate event was emitted
        // NOTE:
        // unlike an event emitted directly from a called contract, this came from
        // a contract called by the one we called. therefore, everything is a string
        // in the resulting event because it was translated from raw logs by truffle-event
        truffleAssert.eventEmitted(factoryScope, 'NewPrime', (ev) => {
            return (
                ev.id === String(id) &&
                ev.serial === String(serial) &&
                ev.generation === String(generation) &&
                ev.series === String(series) &&
                ev.gender === String(gender) &&
                ev.traits === String(traits)
            );
        }, 'NewPrime event should be emitted with correct info');

    });

    xit("should show appropriately decreased allowance for minter contract after purchasing replicant", async function() {

        // Check balance
        // Two deposits of 1 ETH each, minus two purchases at .5 ETH each leaves 1 ETH remaining
        let result = await minterContract.checkDepositorBalance({from: purchaser});
        assert.ok(result.eq(depositAmount), "Deposit balance wasn't correct");

    });

});