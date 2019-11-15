"use strict";
const nodeHelper = require("../helpers/node-helper");

module.exports = {
  build: function(node, contracts) {
    function getBaseContract(superId) {
      for(let i in contracts) {
        const contract = contracts[i];
        const result = nodeHelper.findNodeById(contract.ast.nodes, superId);

        if(result.id === superId) {
          return contract;
        }
      }
    }

    if(!node) {
      return "";
    }

    const builder = [];
    builder.push("⤾ ");
    builder.push("overrides ");

    const superId = node.superFunction || 0;

    if(superId == 0) {
      return "";
    }

    var baseContract = getBaseContract(superId);
    builder.push(`[${baseContract.contractName}.${node.name}](${baseContract.contractName}.md#${node.name.toLowerCase()})`);

    return builder.join("");
  }
};