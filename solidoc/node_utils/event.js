"use strict";
const enumerable = require("linq");

module.exports = {
  getEvents: function(contract) {
    let events = [];

    const nodes = contract.ast.nodes;

    for(let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if(node.nodeType == "EventDefinition") {
        events.push(node);
      }

      const candidates = enumerable.from(node.nodes).where(function(x) {
        return x.nodeType === "EventDefinition";
      }).toArray();

      events = events.concat(candidates);
    }

    return events;
  }
};