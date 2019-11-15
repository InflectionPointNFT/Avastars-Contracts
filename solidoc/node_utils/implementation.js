"use strict";
const enumerable = require("linq");

module.exports = {
  getImplementations: function(source, contracts) {
    const implementations = [];

    for(let i in contracts) {
      const contract = contracts[i];

      if(!contract.ast) {
        continue;
      }

      const node = enumerable.from(contract.ast.nodes).where(function(x) {
        return x.baseContracts && x.baseContracts.length;
      }).firstOrDefault();

      if(node) {
        const hasImplementation = enumerable.from(node.baseContracts).where(function(x) {
          return x.baseName.name === source.contractName;
        }).toArray().length > 0;

        if(hasImplementation) {
          implementations.push(contract);
        }
      }
    }

    return implementations;
  }
};