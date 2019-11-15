"use strict";
const enumerable = require("linq");

module.exports = {
  build: function(node) {
    if(!node) {
      return "";
    }

    const builder = [];

    builder.push(`### ${node.name}`);
    builder.push("\n");
    builder.push("\n");
    builder.push("```solidity");
    builder.push("\n");
    builder.push(`struct ${node.name} {`);
    builder.push("\n");

    const members = enumerable.from(node.members).select(function(x) {
      return ` ${x.typeDescriptions.typeString} ${x.name}`;
    }).toArray();

    builder.push(members.join("," + "\n"));

    builder.push("\n");

    builder.push("}");
    builder.push("\n");
    builder.push("```");
    builder.push("\n");
    builder.push("\n");

    return builder.join("");
  }
};