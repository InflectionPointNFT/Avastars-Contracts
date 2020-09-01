const AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
const AvastarReplicantToken = artifacts.require("./AvastarReplicantToken.sol");
const AvastarReplicantMinter = artifacts.require("./AvastarReplicantMinter.sol");

const truffleAssert = require('truffle-assertions');
const truffleEvent  = require('../util/truffle-events');
const exceptions = require ("../util/Exceptions");
const constants = require("../util/Constants");
const BN = require('bn.js');

contract('AvastarReplicantToken', function(accounts) {

    let teleporterContract, artContract;
    const sysAdmin = accounts[0];  // minter contract admin, ART contract owner
    const purchaser = accounts[1]; // token owner
    const minter = accounts[2];    // minter role
    const anyone = accounts[3];    // anyone else

    const traits1 = new BN('4835703422573704792572931', 10);
    const traits2 = new BN('59374701396491835636974613', 10);
    const traits3 = new BN('6044669605981521127212033', 10);

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

    before(async () => {
        // Create the factory contract and unpause
        teleporterContract = await AvastarTeleporter.new();

        // Add the minters to the factory contract
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

    });

    it("should not allow anyone other than prime's owner to claim their ART tokens", async function() {

        // Attempt invalid claim
        await exceptions.catchRevert(
            artContract.claimArt(primeIds, {from: sysAdmin})
        );

    });

    it("should allow a prime owner to claim their ART tokens", async function() {

        // Claim the primes for ART
        await artContract.claimArt(primeIds, {from: purchaser});

    });

});