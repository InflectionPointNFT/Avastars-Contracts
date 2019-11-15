"use strict";
const enumerable = require("linq");

module.exports = {
  getEnums: function(contract) {
    let enums = [];

    const nodes = enumerable.from(contract.ast.nodes).where(function(x) {
      return x.nodes;
    }).toArray();

    for(let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if(node.nodeType == "EnumDefinition") {
        enums.push(node);
      }

      const candidates = enumerable.from(node.nodes).where(function(x) {
        return x.nodeType === "EnumDefinition";
      }).toArray();

      enums = enums.concat(candidates);
    }

    return enums;
  }
};