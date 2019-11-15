"use strict";
const enumerable = require("linq");

module.exports = {
  getStructs: function(contract) {
    let structs = [];

    const nodes = enumerable.from(contract.ast.nodes).where(function(x) {
      return x.nodes;
    }).toArray();

    for(let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if(node.nodeType == "StructDefinition") {
        structs.push(node);
      }

      const candidates = enumerable.from(node.nodes).where(function(x) {
        return x.nodeType === "StructDefinition";
      }).toArray();

      structs = structs.concat(candidates);
    }

    return structs;
  }
};