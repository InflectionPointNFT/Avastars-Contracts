const AvastarBase = artifacts.require("./AvastarBaseWrapper.sol");
const traitData = require("./data/TraitData");
const BN = require('bn.js');

contract('AvastarBase', function(accounts) {

    let contract;

    before(async () => {
        // Get the contract instance for this suite
        // The AvastarBaseWrapper contract inherits AvastarBase, so
        // all AvastarBase's public and external methods are available
        // additionally, pass-through functions for testing AvastarBase's
        // internal functions are available.
        contract = await AvastarBase.new();

    });

    it("should allow descendent contracts to concatenate two strings", async function() {

        const trait1 = traitData.avastar[0];
        const trait2 = traitData.avastar[1];

        // Compute the expected result
        const expected = `${trait1.svg}${trait2.svg}`;

        // Get the concatenated string
        const result = await contract._strConcat(trait1.svg, trait2.svg);

        assert.equal(result, expected, "Concatenated string wasn't correct");

    });

    it("should allow descendent contracts to convert a uint to a string", async function() {

        // Compute the expected result
        const expected = "90125";

        // Create the uint
        const value = new BN(expected, 10);

        // Get the converted value
        const result = await contract._uintToStr(value);

        assert.equal(result, expected, "Converted value wasn't correct");

    });

});