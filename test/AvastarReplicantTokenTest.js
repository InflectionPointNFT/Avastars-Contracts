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
        artContract = await AvastarReplicantToken.new();
        replicantMinterContract = await AvastarReplicantMinter.new();

        // Setup and unpause teleporter contract
        await teleporterContract.addMinter(minter);
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

        // Mint one replicant for testing
        const {generation, gender, traits, ranking} = replicant;
        await teleporterContract.mintReplicant(purchaser, traits, generation, gender, ranking, {from: minter})
    });

    it("should not allow anyone other than sysadmin to claim a Prime holder's ART tokens in bulk", async function() {

        // Attempt invalid claim from someone other than owner
        await exceptions.catchRevert(
            artContract.claimArtBulk(purchaser, bulkPrimeIds, none, {from: anyone})
        );

    });

    it("should not allow anyone other than a minter to claim a Prime holder's lone ART token", async function() {

        // Attempt invalid claim from someone other than owner
        await exceptions.catchRevert(
            artContract.claimArt(purchaser, lonePrimeId, none, {from: anyone})
        );

    });

    it("should not allow a replicant id to be specified when claiming ART tokens in bulk", async function() {

        // Attempt invalid claim with a replicant id included
        await exceptions.catchRevert(
            artContract.claimArtBulk(purchaser, mixedIds, none, {from: sysAdmin})
        );

    });

    it("should not allow a replicant id to be specified when claiming lone ART tokens", async function() {

        // Attempt invalid claim with a replicant id included
        await exceptions.catchRevert(
            artContract.claimArt(purchaser, replicantId, none, {from: minter})
        );

    });

    it("should allow the system admin to claim ART tokens for a Prime owner in bulk", async function() {

        const allowance = await artContract.allowance(purchaser, replicantMinterContract.address);
        const expected = new BN('2',10);

        // Claim ART for the owned primes
        const result = await artContract.claimArtBulk(purchaser, bulkPrimeIds, allowance, {from: sysAdmin});

        // Test that a ARTMinted event was emitted
        truffleAssert.eventEmitted(result, 'ARTMinted', (ev) => {
            return (
                ev.holder === purchaser &&
                ev.amount.eq(expected)
            );
        }, 'ARTMinted event should be emitted with correct info');

    });

    it("should allow a minter to claim lone ART tokens for a Prime owner", async function() {

        const allowance = await artContract.allowance(purchaser, replicantMinterContract.address);
        const expected = new BN('1',10);

        // Claim ART for the owned primes
        const result = await artContract.claimArt(purchaser, lonePrimeId, allowance, {from: minter});

        // Test that a ARTMinted event was emitted
        truffleAssert.eventEmitted(result, 'ARTMinted', (ev) => {
            return (
                ev.holder === purchaser &&
                ev.amount.eq(expected)
            );
        }, 'ARTMinted event should be emitted with correct info');

    });

    it("should have auto-approved replicant minter's allowance of the the purchaser's ART tokens", async function() {
        // Expected allowance
        const expectedAllowance = new BN('3', 10).mul(scaleFactor);

        // Check the replicant minter's allowance for the purchaser
        const result = await artContract.allowance(purchaser, replicantMinterContract.address);
        assert.ok(result.eq(expectedAllowance), "Replicant minter contract's allowance was not correct for purchaser");

    });

    it("should only allow one ART token to be claimed for each Prime in bulk", async function() {
        // Accrued allowance for replicant minter contract
        const allowance = new BN('1',10);

        // Attempt claiming primes again
        await exceptions.catchRevert(
            artContract.claimArtBulk(purchaser, bulkPrimeIds, allowance, {from: sysAdmin})
        );

    });

    it("should not allow one ART tokens to be claimed for previously claimed lone Primes", async function() {

        // Accrued allowance for replicant minter contract
        const allowance = new BN('1',10);

        // Attempt claiming prime again
        await exceptions.catchRevert(
            artContract.claimArt(purchaser, lonePrimeId, allowance, {from: minter})
        );

    });

    it("should show the correct balance for a token holder", async function() {

        const expected = new BN('3', 10).mul(scaleFactor);

        // Claim the primes for ART
        const result = await artContract.balanceOf(purchaser);
        assert.ok(result.eq(expected), "Balance amount was not correct");

    });

    it("should reflect newly minted tokens in circulation", async function() {
        const expectedAmount = new BN('3', 10);

        // Claim the primes for ART
        const result = await artContract.getCirculatingArt();
        assert.ok(result.eq(expectedAmount), "Circulation amount was not correct");

    });

    it("should not allow anyone not approved to burn someone else's tokens", async function() {

        // Attempt claiming primes again
        await exceptions.catchRevert(
            artContract.burnArt(purchaser, {from: anyone})
        );

    });

    it("should allow token holder to approve another address for spending/burning", async function() {

        // Amount to approve
        let amount = new BN('1', 10).mul(scaleFactor);

        // Approve the spender using increaseAllowance rather than approve, which mitigates front-running
        // https://blog.smartdec.net/erc20-approve-issue-in-simple-words-a41aaf47bca6

        // Check result with .call()
        const success = await artContract.increaseAllowance.call(spender, amount, {from: purchaser});
        assert.equal(success, true, "Spender allowance increase failed");

        // Do it for real
        await artContract.increaseAllowance(spender, amount, {from: purchaser});

        // Check that the allowance was increased
        const allowance = await artContract.allowance(purchaser, spender);
        assert.ok(allowance.eq(amount), "Spender allowance not increased");

    });

    it("should allow a spender to burn ART tokens within their allowance", async function() {

        const allowance = await artContract.allowance(purchaser, spender);
        const tokens = allowance.div(scaleFactor).toNumber();
        const one = new BN('1',10);

        // Claim the primes for ART
        // Burn allowance
        for (let i=0; i < tokens; i++) {

            // Burn a token
            const result = await artContract.burnArt(purchaser, {from: spender});

            // Test that a ARTBurned event was emitted
            truffleAssert.eventEmitted(result, 'ARTBurned', (ev) => {
                return (
                    ev.holder === purchaser &&
                    ev.amount.eq(one)
                );
            }, 'ARTBurned event should be emitted with correct info');
        }
    });

    it("should not allow a spender to burn more ART tokens than their allowance", async function() {

        const allowance = await artContract.allowance(purchaser, spender);
        const tokens = allowance.div(scaleFactor).toNumber();

        // Should have no allowance
        assert.equal(tokens, 0);

        // Attempt to burn more tha
        await exceptions.catchRevert(
            artContract.burnArt(purchaser, {from: spender})
        )
    });

});