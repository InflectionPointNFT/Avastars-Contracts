const AvastarTeleporter = artifacts.require("./AvastarTeleporter.sol");
const AvastarPrimeMinter = artifacts.require("./AvastarPrimeMinter.sol");
const truffleAssert = require('truffle-assertions');
const truffleEvent  = require('../util/truffle-events');
const exceptions = require ("../util/Exceptions");
const constants = require("../util/Constants");
const BN = require('bn.js');

contract('AvastarPrimeMinter', function(accounts) {

    let teleporterContract, minterContract;
    const sysAdmin = accounts[0];
    const purchaser = accounts[1];
    const minter = accounts[2]; // account invoking minter contract must also have minter role
    const owner = accounts[3]; // account invoking withdrawFranchiseBalance must have owner role
    const anyone = accounts[4];

    const depositAmount = new BN("1000000000000000000", 10);   //  1 ETH in Wei
    const doubleDeposit = new BN("2000000000000000000", 10);   //  1 ETH in Wei
    const depositAfterOne = new BN("1500000000000000000", 10); // 1.5 ETH in Wei
    const price = new BN("500000000000000000", 10);            // .5 ETH in Wei
    const traits1 = new BN('4835703422573704792572931', 10);
    const traits2 = new BN('59374701396491835636974613', 10);
    const traits3 = new BN('6044669605981521127212033', 10);

    const prime1 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.ONE,
        "traits"     : traits1,
        "ranking"    : 33,
        "price"      : price
    };

    const prime2 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.FEMALE,
        "series"     : constants.SERIES.ONE,
        "traits"     : traits2,
        "ranking"    : 46,
        "price"      : price
    };

    const prime3 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.TWO,
        "traits"     : traits3,
        "ranking"    : 68,
        "price"      : price
    };

    const prime4 = {
        "generation" : constants.GENERATION.TWO,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.ONE,
        "traits"     : traits3,
        "ranking"    : 68,
        "price"      : price
    };

    before(async () => {
        // Create the factory contract and unpause
        teleporterContract = await AvastarTeleporter.new();

        // Create the minter contract and set the factory contract
        minterContract = await AvastarPrimeMinter.new();
        await minterContract.setTeleporterContract(teleporterContract.address);
        minterContract.setCurrentGeneration(constants.GENERATION.ONE);
        minterContract.setCurrentSeries(constants.SERIES.ONE);
        minterContract.addMinter(minter);
        minterContract.addOwner(owner);
        await minterContract.unpause();

        // Add the minter to the factory contract
        await teleporterContract.addMinter(minterContract.address);
        await teleporterContract.unpause();

    });

    it("should allow anyone to deposit ETH", async function() {

        // Deposit 1 ETH
        let result = await minterContract.deposit({from: purchaser, value: depositAmount});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'DepositorBalance', (ev) => {
            return (
                ev.depositor === purchaser &&
                ev.balance.eq(depositAmount)
            );
        }, 'DepositorBalance event should be emitted with correct info');

    });

    it("should allow another depositor to deposit ETH", async function() {

        // Deposit 1 ETH
        let result = await minterContract.deposit({from: anyone, value: depositAmount});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'DepositorBalance', (ev) => {
            return (
                ev.depositor === anyone &&
                ev.balance.eq(depositAmount)
            );
        }, 'DepositorBalance event should be emitted with correct info');

    });

    it("should allow a depositor to check their balance", async function() {

        // Check balance
        let result = await minterContract.checkDepositorBalance({from: purchaser});
        assert.ok(result.eq(depositAmount), "Deposit balance wasn't correct");

    });

    it("should allow a depositor to deposit more ETH", async function() {

        // Deposit 1 ETH
        let result = await minterContract.deposit({from: purchaser, value: depositAmount});

        // Test that appropriate event was emitted
        // this was the second deposit to the contract so balance will be twice deposit amount
        truffleAssert.eventEmitted(result, 'DepositorBalance', (ev) => {
            return (
                ev.depositor === purchaser &&
                ev.balance.eq(doubleDeposit)
            );
        }, 'DepositorBalance event should be emitted with correct info');

    });

    it("should show increased balance for a depositor after depositing more ETH", async function() {

        // Check balance
        let result = await minterContract.checkDepositorBalance({from: purchaser});
        assert.ok(result.eq(doubleDeposit), "Deposit balance wasn't correct");

    });

    it("should allow an owner to check the franchise balance, (zero if nothing has been purchased)", async function() {

        // Check franchise balance
        let result = await minterContract.checkFranchiseBalance({from: owner});
        let expected = new BN(0,10); // nothing spent, nothing earned
        assert.ok(result.eq(expected), "Franchise balance wasn't correct");

    });

    it("should allow minter to purchase a prime if purchaser has already deposited ETH", async function() {

        const {generation, price, gender, series, traits, ranking} = prime1;
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

    it("should allow minter to purchase another prime if purchaser has sufficient ETH remaining", async function() {

        const {generation, price, gender, series, traits, ranking} = prime2;
        let id = new BN(1,10);
        let serial = new BN(1,10);

        // 1 ETH was previously deposited in contract
        // Purchase the prime
        let result = await minterContract.purchasePrime(purchaser, price, traits, gender, ranking, {from: minter});

        // Test that a DepositorBalance event was emitted
        truffleAssert.eventEmitted(result, 'DepositorBalance', (ev) => {
            return (
                ev.depositor === purchaser &&
                ev.balance.eq(depositAmount) // one ETH spent of the two deposited
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

    it("should show appropriately decreased balance for depositor after purchasing primes", async function() {

        // Check balance
        // Two deposits of 1 ETH each, minus two purchases at .5 ETH each leaves 1 ETH remaining
        let result = await minterContract.checkDepositorBalance({from: purchaser});
        assert.ok(result.eq(depositAmount), "Deposit balance wasn't correct");

    });

    it("should allow a depositor to withdraw a non-zero balance", async function() {

        // Get initial balance of depositor's address (not their contract balance)
        const initial = new BN(await web3.eth.getBalance(purchaser), 10);

        // Withdraw balance
        let result = await minterContract.withdrawDepositorBalance({from: purchaser});
        let expectedDepositBalance = new BN(0,10); // zero contract balance for depositor after transfer

        // Test that a DepositorBalance event was emitted
        truffleAssert.eventEmitted(result, 'DepositorBalance', (ev) => {
            return (
                ev.depositor === purchaser &&
                ev.balance.eq(expectedDepositBalance)
            );
        }, 'DepositorBalance event should be emitted with correct info');

        // Calculate the cost of the transaction
        const gasUsed = result.receipt.gasUsed;
        const tx = await web3.eth.getTransaction(result.tx);
        const txCost = web3.utils.toBN(tx.gasPrice * gasUsed);

        // Get the depositor's final account balance
        const final = await web3.eth.getBalance(purchaser);

        assert.equal(initial.add(depositAmount).sub(txCost), final, "Amount after transfer incorrect");
    });

    it("should not allow minter to purchase a prime if purchaser has withdrawn their balance", async function() {

        const {price, gender, traits, ranking} = prime3;

        // No ETH has yet been deposited in contract
        // Try to purchase the prime
        await exceptions.catchRevert(
            minterContract.purchasePrime(purchaser, price, traits, gender, ranking, {from: minter})
        )

    });

    it("should allow an owner to check the franchise balance, (has value after purchases)", async function() {

        // Check franchise balance
        // Should be the total of two purchases adding up to depositAmount
        let result = await minterContract.checkFranchiseBalance({from: owner});
        assert.ok(result.eq(depositAmount), "Franchise balance wasn't correct");

    });

    it("should allow an owner to withdraw the franchise balance", async function() {

        // Get initial balance of depositor's address (not their contract balance)
        const initial = new BN(await web3.eth.getBalance(owner), 10);

        // Withdraw balance
        let result = await minterContract.withdrawFranchiseBalance({from: owner});
        let expectedFranchiseBalance = depositAmount; // amount from two purchases

        // Test that a DepositorBalance event was emitted
        truffleAssert.eventEmitted(result, 'FranchiseBalanceWithdrawn', (ev) => {
            return (
                ev.owner === owner &&
                ev.amount.eq(expectedFranchiseBalance)
            );
        }, 'FranchiseBalanceWithdrawn event should be emitted with correct info');

        // Calculate the cost of the transaction
        const gasUsed = result.receipt.gasUsed;
        const tx = await web3.eth.getTransaction(result.tx);
        const txCost = web3.utils.toBN(tx.gasPrice * gasUsed);

        // Get the depositor's final account balance
        const final = await web3.eth.getBalance(owner);

        assert.equal(initial.add(depositAmount).sub(txCost), final, "Amount after transfer incorrect");
    });

    it("should allow another depositor to check their balance", async function() {

        // Check balance
        let result = await minterContract.checkDepositorBalance({from: anyone});
        assert.ok(result.eq(depositAmount), "Deposit balance wasn't correct");

    });

    it("should allow another depositor to withdraw a non-zero balance", async function() {

        // Get initial balance of depositor's address (not their contract balance)
        const initial = new BN(await web3.eth.getBalance(anyone), 10);

        // Withdraw balance
        let result = await minterContract.withdrawDepositorBalance({from: anyone});
        let expectedDepositBalance = new BN(0,10); // zero contract balance for depositor after transfer

        // Test that a DepositorBalance event was emitted
        truffleAssert.eventEmitted(result, 'DepositorBalance', (ev) => {
            return (
                ev.depositor === anyone &&
                ev.balance.eq(expectedDepositBalance)
            );
        }, 'DepositorBalance event should be emitted with correct info');

        // Calculate the cost of the transaction
        const gasUsed = result.receipt.gasUsed;
        const tx = await web3.eth.getTransaction(result.tx);
        const txCost = web3.utils.toBN(tx.gasPrice * gasUsed);

        // Get the depositor's final account balance
        const final = await web3.eth.getBalance(anyone);

        assert.equal(initial.add(depositAmount).sub(txCost), final, "Amount after transfer incorrect");
    });

    it("should not allow non-sysadmins to set current series", async function() {

        // Try to set the current Series
        await exceptions.catchRevert(
            minterContract.setCurrentSeries(constants.SERIES.TWO, {from: anyone})
        )

    });

    it("should not allow system administrator to set current series if contract not paused", async function() {

        // Try to set the current Series
        await exceptions.catchRevert(
            minterContract.setCurrentSeries(constants.SERIES.TWO, {from: sysAdmin})
        )

    });

    it("should allow system administrator to set current series if paused", async function() {

        const series = new BN(constants.SERIES.TWO, 10);

        // Pause the contract
        await minterContract.pause();

        // Try to set the current Series
        let result = await minterContract.setCurrentSeries(series, {from: sysAdmin});

        // Test that a CurrentSeriesSet event was emitted
        truffleAssert.eventEmitted(result, 'CurrentSeriesSet', (ev) => {
            return (
                ev.currentSeries.eq(series)
            );
        }, 'CurrentSeriesSet event should be emitted with correct info');

        // Unpause the contract
        await minterContract.unpause();

    });

    it("should reflect change of series in newly minted primes", async function() {

        const {generation, price, gender, series, traits, ranking} = prime3;

        // Purchase the prime
        await minterContract.deposit({from: purchaser, value: depositAmount});
        let result = await minterContract.purchasePrime(purchaser, price, traits, gender, ranking, {from: minter});

        // Get events emitted from the factory
        let factoryScope = truffleEvent.formTxObject('AvastarTeleporter', 1, result);

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(factoryScope, 'NewPrime', (ev) => {
            return (
                ev.generation === String(generation) &&
                ev.series === String(series)
            );
        }, 'NewPrime event should be emitted with correct info');

    });

    it("should not allow non-sysadmins to set current generation", async function() {

        // Try to set the current Generation
        await exceptions.catchRevert(
            minterContract.setCurrentGeneration(constants.GENERATION.TWO, {from: anyone})
        )

    });

    it("should not allow system administrator to set current generation if contract not paused", async function() {

        // Try to set the current Series
        await exceptions.catchRevert(
            minterContract.setCurrentGeneration(constants.GENERATION.TWO, {from: sysAdmin})
        )

    });

    it("should allow system administrator to set current generation if paused; series is reset", async function() {

        const generation = new BN(constants.GENERATION.TWO, 10);
        const series = new BN(constants.SERIES.ONE, 10);

        // Pause the contract
        await minterContract.pause();

        // Try to set the current Generation
        let result = await minterContract.setCurrentGeneration(generation, {from: sysAdmin});

        // Test that a CurrentGenerationSet event was emitted
        truffleAssert.eventEmitted(result, 'CurrentGenerationSet', (ev) => {
            return (
                ev.currentGeneration.eq(generation)
            );
        }, 'CurrentGenerationSet event should be emitted with correct info');


        // Test that a CurrentSeriesSet event was emitted
        truffleAssert.eventEmitted(result, 'CurrentSeriesSet', (ev) => {
            return (
                ev.currentSeries.eq(series)
            );
        }, 'CurrentSeriesSet event should be emitted with correct info');

        // Unpause the contract
        await minterContract.unpause();

    });

    it("should reflect change of generation and series in newly minted primes", async function() {

        const {generation, price, gender, series, traits, ranking} = prime4;

        // Purchase the prime
        await minterContract.deposit({from: purchaser, value: depositAmount});
        let result = await minterContract.purchasePrime(purchaser, price, traits, gender, ranking, {from: minter});

        // Get events emitted from the factory
        let factoryScope = truffleEvent.formTxObject('AvastarTeleporter', 1, result);

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(factoryScope, 'NewPrime', (ev) => {
            return (
                ev.generation === String(generation) &&
                ev.series === String(series)
            );
        }, 'NewPrime event should be emitted with correct info');

    });

});