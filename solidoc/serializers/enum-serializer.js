"use strict";
const nodeHelper = require("../helpers/node-helper");
const enumBuilder = require("../builders/enum-builder");
const i18n = require("../i18n");

module.exports = {
  serialize: function(contract, template) {
    const builder = [];

    const nodes = nodeHelper.getEnumerators(contract);

    if(!nodes || !nodes.length) {
      return template.replace("{{Enumerators}}", "");
    }

    builder.push(`## **${i18n.translate("Enums")}**`);
    builder.push("\n");

    for(let i in nodes) {
      const node = nodes[i];
      builder.push(enumBuilder.build(node));
    }

    template = template.replace("{{Enumerators}}", builder.join(""));

    return template;
  }
};