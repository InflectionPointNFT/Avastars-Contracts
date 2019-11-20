"use strict";
const i18n = require("../i18n");

module.exports = {
  build: function(nodes) {
    if(!nodes || !nodes.length) {
      return "";
    }

    const builder = [];

    builder.push(`## ${i18n.translate("Events")}`);
    builder.push("\n");
    builder.push("\n");
    builder.push("```solidity");
    builder.push("\n");

    for(let i in nodes) {
      const node = nodes[i];
      const parameterList = [];

      for(let i in node.parameters.parameters) {
        const parameter = node.parameters.parameters[i];
        const argumentName = parameter.name;
        const dataType = parameter.typeDescriptions.typeString.replace("contract ", "");
        const indexed = parameter.indexed || false;

        parameterList.push(`${dataType} ${indexed ? "indexed " : ""}${argumentName}`.trim());
      }

      builder.push(`event ${node.name}(`);

      if (parameterList.length > 2) {
        builder.push("\n\t");
        builder.push(parameterList.join(",\n\t"));
        builder.push("\n");
      } else {
        builder.push(parameterList.join(", "));
      }

      builder.push(")\n");

    }

    builder.push("```");
    builder.push("\n");
    builder.push("\n");

    return builder.join("");
  }
};