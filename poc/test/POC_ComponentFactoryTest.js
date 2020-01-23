const POC_AvaStars = artifacts.require("./POC_AvaStars.sol");
const exceptions = require ("../../util/Exceptions");


contract('poc ComponentFactory', function(accounts) {

    let contract ;
    const sysAdmin = accounts[0];
    const nonSysAdmin = accounts[1];

    const svg = {
        open: '<svg>',
        close: '</svg>'
    };

    const circle = {
        id: 0,
        name: "Circle",
        svg: '<circle cx="52" cy="56" r="40" stroke="lime" stroke-width="2" fill="purple" />'
    };

    const star = {
        id: 1,
        name: "Star",
        svg: '<polygon points="50,5 20,99 99,40 5,40 80,99" fill="#76ff03" stroke-width="2" stroke="#7c43bd"/>'
    };

    const rect = {
        name: "Rectangle",
        svg: '<rect width="50" height="50" fill="#76ff03" stroke-width="2" stroke="#7c43bd"/>'
    };

    before(async () => {
        // Get the contract instance for this suite
        contract = await POC_AvaStars.new();

        // Unpause the contract
        await contract.unpause();

    });

    it("should allow sysadmin to create a component", async function() {

        // The name and name of the new component
        const {name, svg, id} = circle;

        // Get the Component ID (using call, to avoid receiving a transaction)
        const componentId = (await contract.createComponent.call(name, svg, {from: sysAdmin})).toNumber();
        assert.equal(componentId, id, "Component id wasn't returned");

        // Now call the function for real and write the data
        await contract.createComponent(name, svg, {from: sysAdmin});

        // Make sure the stored component is correct
        const component = await contract.getComponent(id);
        assert.equal(component[0].toNumber(), id, "Component ID field wasn't correct");
        assert.equal(component[1], name, "Desc field wasn't correct");
        assert.equal(component[2], svg, "Svg field wasn't correct");

    });

    it("should allow sysadmin to retrieve a component", async function() {

        // The name and svg of the new component
        const {name, svg, id} = circle;

        // Make sure the stored component is correct
        const component = await contract.getComponent(id);
        assert.equal(component[0].toNumber(), id, "Component ID field wasn't correct");
        assert.equal(component[1], name, "Desc field wasn't correct");
        assert.equal(component[2], svg, "Svg field wasn't correct");

    });

    it("should allow sysadmin to create another component", async function() {

        // The name and name of the new component
        const {name, svg, id} = star;

        // Get the Component ID (using call, to avoid receiving a transaction)
        const componentId = (await contract.createComponent.call(name, svg, {from: sysAdmin})).toNumber();
        assert.equal(componentId, id, "Component id wasn't returned");

        // Now call the function for real and write the data
        await contract.createComponent(name, svg, {from: sysAdmin});

    });

    it("should allow sysadmin to test concatenation of components svg", async function() {

        // The name and name of the new component
        const sandwich = `${svg.open}${circle.svg}${star.svg}${svg.close}`;

        // Make sure the stored component is correct
        const component = await contract.getSandwich(circle.id, star.id);
        assert.equal(component, sandwich, "Returned SVG sandwich wasn't correct");

    });

    it("should not allow non-sysadmins to create components", async function() {

        // The name and svg of the new component
        const name = rect.name;
        const svg = rect.svg;

        // Try to let non-sysadmin create a component
        await exceptions.catchRevert(contract.createComponent(name, svg, {from: nonSysAdmin}));

    });

    it("should not allow non-sysadmins to retrieve components", async function() {

        // The component id to retrieve
        const componentId = 0;

        // Try to let non-sysadmin get a component
        await exceptions.catchRevert(contract.getComponent(componentId, {from: nonSysAdmin}));

    });


});

