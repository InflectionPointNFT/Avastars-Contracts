"use strict";
const contractNode = require("../node_utils/contract");
const constructorNode = require("../node_utils/constructor");
const enumNode = require("../node_utils/enum");
const eventNode = require("../node_utils/event");
const functionNode = require("../node_utils/function");
const implementation = require("../node_utils/implementation");
const modifierNode = require("../node_utils/modifier");
const node = require("../node_utils/node");
const returnParameterNode = require("../node_utils/return-parameters");
const structNode = require("../node_utils/struct");

module.exports = {
  findNodeById: function(nodes, id) {
    return node.findNodeById(nodes, id);
  },
  findOverriddenNodesById: function(contracts, id) {
    return contractNode.findOverriddenNodesById(contracts, id);
  },
  getBaseContracts: function(contract) {
    return contractNode.getBaseContract(contract);
  },
  getConstructorNode: function(contract) {
    return constructorNode.getConstructorNode(contract);
  },
  getContractNode: function(contract) {
    return contractNode.getContractNode(contract);
  },
  getEnumerators: function(contract) {
    return enumNode.getEnums(contract);
  },
  getEvents: function(contract) {
    return eventNode.getEvents(contract);
  },
  getFunctions: function(contract) {
    return functionNode.getFunctions(contract);
  },
  getImplementations: function(source, contracts) {
    return implementation.getImplementations(source, contracts);
  },
  getMembers: function(contract) {
    return contractNode.getMembers(contract);
  },
  getModifiers: function(contract) {
    return modifierNode.getModifiers(contract);
  },
  getReturnParameters: function(node) {
    return returnParameterNode.getReturnParameters(node);
  },
  getStructs: function(contract) {
    return structNode.getStructs(contract);
  }
};