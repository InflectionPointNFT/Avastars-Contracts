"use strict";
const nodeHelper = require("../helpers/node-helper");
const i18n = require("../i18n");

module.exports = {
  build: function(node, contracts) {
    if(!node) {
      return "";
    }

    const builder = [];

    builder.push(i18n.translate("Overridden"));

    const id = node.id;

    if(!id) {
      return "";
    }

    const references = [];
    const implementations = nodeHelper.findOverriddenNodesById(contracts, id);

    for(let i in implementations) {
      const implementation = implementations[i];

      references.push(`[${implementation.contract.contractName}.${implementation.node.name}](${implementation.contract.contractName}.md#${implementation.node.name.toLowerCase()})`);
    }

    if(!references.length) {
      return "";
    }

    builder.push(references.join(","));

    return builder.join("");
  }
};