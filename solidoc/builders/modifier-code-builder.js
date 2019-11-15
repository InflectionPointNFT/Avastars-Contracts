"use strict";
const enumerable = require("linq");

module.exports = {
  build: function(node) {
    if(!node) {
      return "";
    }

    const builder = [];

    const parameters = node.parameters.parameters;

    const parameterList = enumerable.from(parameters).select(function(x) {
      const argumentName = x.name;
      const dataType = x.typeDescriptions.typeString.replace("contract ", "");
      return dataType + " " + argumentName;
    }).toArray();

    builder.push("```solidity");
    builder.push("\n");
    builder.push(`modifier ${node.name}(`);

    builder.push(parameterList.join(", "));

    builder.push(") ");

    builder.push(node.visibility.toLowerCase());
    builder.push("\n");
    builder.push("```");

    return builder.join("");
  }
};