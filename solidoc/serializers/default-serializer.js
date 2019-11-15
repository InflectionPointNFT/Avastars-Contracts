"use strict";

module.exports = {
  serialize: function(contract, template) {
    const now = new Date();

    template = template.replace("{{Time}}", now.toTimeString());
    template = template.replace("{{Date}}", now.toISOString());
    template = template.replace("{{CurrentDirectory}}", process.env.PWD);

    return template;
  }
};