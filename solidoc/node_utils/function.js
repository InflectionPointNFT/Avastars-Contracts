"use strict";
const enumerable = require("linq");

module.exports = {
  getFunctions: function(contract) {
    let functions = [];

    const nodes = enumerable.from(contract.ast.nodes).where(function(x) {
      return x.nodes;
    }).toArray();

    for(let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if(node.nodeType == "FunctionDefinition") {
        functions.push(node);
      }

      const candidates = enumerable.from(node.nodes).where(function(x) {
        return x.nodeType === "FunctionDefinition";
      }).toArray();

      functions = functions.concat(candidates);
    }

    return functions;
  }
};