"use strict";
const enumerable = require("linq");

module.exports = {
  getModifiers: function(contract) {
    let modifiers = [];

    const nodes = enumerable.from(contract.ast.nodes).where(function(x) {
      return x.nodes;
    }).toArray();

    for(let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if(node.nodeType == "ModifierDefinition") {
        modifiers.push(node);
      }

      const candidates = enumerable.from(node.nodes).where(function(x) {
        return x.nodeType === "ModifierDefinition";
      }).toArray();

      modifiers = modifiers.concat(candidates);
    }

    return modifiers;
  }
};