"use strict";
const nodeHelper = require("../helpers/node-helper");
const eventBuilder = require("../builders/event-builder");

module.exports = {
  serialize: function(contract, template) {
    const builder = [];

    const nodes = nodeHelper.getEvents(contract);

    if(!nodes || !nodes.length) {
      return template.replace("{{Events}}", "");
    }

    builder.push(eventBuilder.build(nodes));

    template = template.replace("{{Events}}", builder.join(""));

    return template;
  }
};
