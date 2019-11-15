"use strict";

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
    builder.push(`enum ${node.name} {`);
    builder.push("\n");

    const members = [];

    for(let i in node.members) {
      const member = node.members[i];
      members.push(` ${member.name}`);
    }

    builder.push(members.join(",\n"));

    builder.push("\n");

    builder.push("}");
    builder.push("\n");
    builder.push("```");
    builder.push("\n");
    builder.push("\n");

    return builder.join("");
  }
};