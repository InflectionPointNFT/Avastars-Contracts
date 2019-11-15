"use strict";
const documentationHelper = require("../helpers/documentation-helper");

module.exports = {
  build: function(documentation, parameters) {
    if(!parameters || !parameters.length) {
      return "";
    }

    const builder = [];

    for(let i in parameters) {
      const parameter = parameters[i];
      builder.push("| ");
      builder.push(parameter.name);
      builder.push(" | ");
      builder.push(parameter.typeDescriptions.typeString.replace("contract ", ""));
      builder.push(" | ");
      const doc = documentationHelper.get(documentation, "param " + parameter.name);
      builder.push(doc);
      builder.push(" | ");
      builder.push("\n");
    }

    return builder.join("");
  }
};