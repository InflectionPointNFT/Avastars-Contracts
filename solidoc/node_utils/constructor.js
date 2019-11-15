"use strict";
const enumerable = require("linq");

module.exports = {
  getConstructorNode: function(contract) {
    let contractNode, constructorNode;
    contractNode = contract.ast.nodes.find(node => node.name === contract.contractName);
    if (contractNode) constructorNode = contractNode.nodes.find( node => node.kind === "constructor") || {};
    return constructorNode;
  }
};