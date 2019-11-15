"use strict";
const enumerable = require("linq");
const nodeHelper = require("./node");

module.exports = {
  findNodeById: function(contract, id) {
    return nodeHelper.findNodeById(contract.ast.nodes, id);
  },
  findNodeByIdMultipleContracts: function(contracts, id) {
    for(let i in contracts) {
      const contract = contracts[i];

      const node = this.findNodeById(contract, id);
      if(node.id && node.id === id) {
        return node;
      }
    }

    return {};
  },
  findOverriddenNodesByIdMultiple: function(nodes, ids) {
    let result = [];

    for(let i in nodes) {
      const node = nodes[i];

      if(ids.indexOf(node.superFunction) >= 0) {
        result.push(node);
      }

      if(node.nodes && node.nodes.length) {
        result = result.concat(this.findOverriddenNodesByIdMultiple(node.nodes, ids));
      }
    }

    return result;
  },
  findOverriddenNodesById: function(contracts, id) {
    const result = [];

    const tree = this.getOverriddenFunctions(contracts, id);
    for(let i in contracts) {
      const contract = contracts[i];

      if(!contract.ast) {
        continue;
      }

      const found = this.findOverriddenNodesByIdMultiple(contract.ast.nodes, tree);

      for(let i in found) {
        const node = found[i];

        result.push({
          contract: contract,
          node: node
        });
      }
    }

    return result;
  },
  getBaseContract: function(contract) {
    const node = enumerable.from(contract.ast.nodes).where(function(x) {
      return x.baseContracts && x.baseContracts.length;
    }).firstOrDefault();

    if(node) {
      return node.baseContracts;
    }

    return {};
  },
  getContractNode: function(contract) {
    const contractNode = enumerable.from(contract.ast.nodes).where(function(x) {
      return x.nodeType === "ContractDefinition";
    }).firstOrDefault();

    if(contractNode) {
      return contractNode;
    }

    const nodes = enumerable.from(contract.ast.nodes).where(function(x) {
      return x.nodes;
    }).toArray();

    for(let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if(node.nodeType == "ContractDefinition") {
        return node;
      }
    }

    return {};
  },
  getMembers: function(contract) {
    const members = [];
    const nodes = enumerable.from(contract.ast.nodes).where(function(x) {
      return x.nodeType === "ContractDefinition";
    }).toArray();

    for(let i in nodes) {
      for(let j in nodes[i].nodes) {
        const member = nodes[i].nodes[j];
        if(member.nodeType === "VariableDeclaration") {
          members.push(member);
        }
      }
    }

    return members;
  },
  getOverriddenFunctions: function(contracts, superId) {
    let references = [superId];

    for(let i in contracts) {
      const contract = contracts[i];

      if(!contract.ast || !contract.ast.nodes) {
        continue;
      }

      for(let j in contract.ast.nodes) {
        const node = contract.ast.nodes[j];

        if(node.superFunction === superId) {
          references.push(node.id);
          references = references.concat(this.getOverriddenFunctions(contracts, node.id));
        }

        if(node.nodes && node.nodes.length) {
          for(let k in node.nodes) {
            const child = node.nodes[k];
            if(child.superFunction == superId) {
              references.push(child.id);
              references = references.concat(this.getOverriddenFunctions(contracts, child.id));
            }
          }
        }
      }
    }

    return references;
  }
};