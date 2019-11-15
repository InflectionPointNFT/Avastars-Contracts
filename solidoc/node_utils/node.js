"use strict";

module.exports = {
  findNodeById: function(nodes, id) {
    for(let i in nodes) {
      const node = nodes[i];

      if(node.id && node.id === id) {
        return node;
      }

      if(node.nodes && node.nodes.length) {
        return this.findNodeById(node.nodes, id);
      }
    }

    return {};
  },
  findOverriddenNodesByIds: function(nodes, supers) {
    let overriddenNodes = [];

    for(let i in nodes) {
      const node = nodes[i];

      if(node.superFunction && supers.indexOf(node.superFunction) >= 0) {
        overriddenNodes.push(node);
      }

      if(node.nodes && node.nodes.length) {
        overriddenNodes = overriddenNodes.concat(this.findOverriddenNodesByIds(node.nodes, supers));
      }
    }

    return overriddenNodes;
  }
};