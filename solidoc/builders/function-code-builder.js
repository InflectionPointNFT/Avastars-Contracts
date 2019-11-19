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

      builder.push("returns(");

      const returnList = [];

      for(let i in returnParameters) {
        const parameter = returnParameters[i];
        returnList.push(`${parameter.name} ${parameter.typeDescriptions.typeString}`.trim());
      }

      builder.push(returnList.join(", "));

      builder.push(")");

      return builder.join("");
    }

    if(!node || !node.parameters) {
      return "";
    }

    const builder = [];

    const parameters = node.parameters.parameters || [];
    const documentation = node.documentation;

    const returnDocumentation = documentationHelper.get(documentation, "return");
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

    builder.push(parameterList.join(", "));

    builder.push(") ");

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
/*
    if(!returnDocumentation) {
      return builder.join("");
    }

    builder.push("\n");
    builder.push("\n");

    builder.push(`**${i18n.translate("Returns")}**`);
    builder.push("\n");
    builder.push("\n");
    builder.push(returnDocumentation);
    builder.push("\n");
*/
    return builder.join("");
  }
};