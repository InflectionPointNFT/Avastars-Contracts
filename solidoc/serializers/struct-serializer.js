"use strict";
const nodeHelper = require("../helpers/node-helper");
const structBuilder = require("../builders/struct-builder");
const i18n = require("../i18n");

module.exports = {
  serialize: function(contract, template) {
    const builder = [];
    var nodes = nodeHelper.getStructs(contract);

    if(!nodes || !nodes.length) {
      return template.replace("{{Structs}}", "");
    }

    builder.push(`## ${i18n.translate("Structs")}`);
    builder.push("\n");

    for(let i in nodes) {
      const node = nodes[i];
      builder.push(structBuilder.build(node));
    }

    template = template.replace("{{Structs}}", builder.join(""));
    return template;
  }
};
