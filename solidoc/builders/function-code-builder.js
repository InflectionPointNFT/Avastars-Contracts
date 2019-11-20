"use strict";
const documentationHelper = require("../helpers/documentation-helper");
const enumerable = require("linq");
const nodeHelper = require("../helpers/node-helper");
const i18n = require("../i18n");

module.exports = {
  build: function(node) {
    function getReturnParameters() {
      const builder = [];

      var returnParameters = nodeHelper.getReturnParameters(node);

      if(!returnParameters || !returnParameters.length) {
        return "";
      }

      const returnList = [];

      for(let i in returnParameters) {
        const parameter = returnParameters[i];
        returnList.push(`${parameter.typeDescriptions.typeString} ${parameter.name}`.trim());
      }

      if (returnList.length > 2) {
        builder.push("returns (\n\t");
        builder.push(returnList.join(",\n\t"));
        builder.push("\n)");
      } else {
        builder.push("returns (");
        builder.push(returnList.join(", "));
        builder.push(")");
      }

      return builder.join("");
    }

    if(!node || !node.parameters) {
      return "";
    }

    const builder = [];

    const parameters = node.parameters.parameters || [];

    const parameterList = [];

    const modifierList = enumerable.from(node.modifiers).select(function(x) {
      return x.modifierName.name;
    }).toArray();

    for(let i in parameters) {
      const parameter = parameters[i];
      const argumentName = parameter.name;
      const dataType = parameter.typeDescriptions.typeString.replace("contract ", "");
      parameterList.push(`${dataType} ${argumentName}`);
    }

    builder.push("```solidity");
    builder.push("\n");

    builder.push(`function ${node.name}(`);

    if (parameterList.length > 2) {
      builder.push("\n\t");
      builder.push(parameterList.join(",\n\t"));
      builder.push("\n");
    } else {
      builder.push(parameterList.join(", "));
    }

    builder.push(")\n");

    builder.push(node.visibility.toLowerCase());

    builder.push(` ${node.stateMutability}`);

    if(modifierList && modifierList.length) {
      builder.push(` ${modifierList.join(" ")} `);
    }

    const returnParameters = getReturnParameters();

    if(returnParameters) {
      builder.push("\n");
      builder.push(returnParameters);
    }

    builder.push("\n");
    builder.push("```");

    return builder.join("");
  }
};