const AvastarFactoryWrapper = artifacts.require("./AvastarFactoryWrapper.sol");
const constants = require("./util/Constants");
const traitData = require("./util/TraitData");
const traitMath = require("./util/TraitMath");

const BN = require('bn.js');

contract('AvastarFactory', function(accounts) {

    let contract;
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
        "wave"       : constants.WAVE.PRIME,
        "serial"     : 1,
        "traits"     : traits1,
        "ranking"    : 33
    };

    const prime2 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.FEMALE,
        "series"     : constants.SERIES.TWO,
        "wave"       : constants.WAVE.PRIME,
        "serial"     : 2,
        "traits"     : traits2,
        "ranking"    : 46
    };

    const prime3 = {
        "generation" : constants.GENERATION.ONE,
        "gender"     : constants.GENDER.MALE,
        "series"     : constants.SERIES.ONE,
        "wave"       : constants.WAVE.PRIME,
        "serial"     : 3,
        "traits"     : traits3,
        "ranking"    : 68
    };

    before(async () => {

        // Get the AvastarContract contract instance for this suite
        contract = await AvastarFactoryWrapper.new();

        // Unpause the contracts
        await contract.unpause({from: sysAdmin});

        // Mint 3 prime avastars
        const mint = prime => contract._mintAvastar(tokenOwner, prime.serial, prime.traits, prime.generation, prime.wave);
        for (const prime of [prime1, prime2, prime3]) {
            await mint(prime);
        }

        // Create prime3's full trait set
        const create = trait => contract.createTrait(trait.generation, trait.series, trait.gender, trait.gene, trait.rarity, trait.variation, trait.name, trait.svg, {from: sysAdmin, gas: constants.MAX_GAS});

        for (const trait of traitData.avastar){
            await create(trait);
        }

    });

    it("should allow anyone to retrieve the wave for a given Avastar by Token ID", async function() {

        // Get the Avastar info
        const wave = await contract.getAvastarWaveByTokenId(id3, {from: stranger});

        // Test results
        assert.equal(wave.toNumber(), constants.WAVE.PRIME, "Wave field wasn't correct");

    });

});