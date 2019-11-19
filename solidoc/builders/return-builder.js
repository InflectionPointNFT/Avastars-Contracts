"use strict";
const documentationHelper = require("../helpers/documentation-helper");

module.exports = {
  build: function(documentation, returnParameters) {
    if(!returnParameters || !returnParameters.length) {
      return "";
    }

    const builder = [];
    let doc = "";

    if (returnParameters.length > 1) {
      for(let i in returnParameters) {
        const parameter = returnParameters[i];
        builder.push("| ");
        builder.push(parameter.name);
        builder.push(" | ");
        builder.push(parameter.typeDescriptions.typeString);
        builder.push(" | ");
        doc = documentationHelper.get(documentation, "return " + parameter.name) || "";
        builder.push(doc);
        builder.push(" | ");
        builder.push("\n");
      }
    } else {
      let parameter = returnParameters[0];
      builder.push("| ");
      builder.push(parameter.name || "");
      builder.push(" | ");
      builder.push(parameter.typeDescriptions.typeString);
      builder.push(" | ");
      doc = documentationHelper.get(documentation, "return " + parameter.name) || "";
      if (doc === "") doc = documentationHelper.get(documentation, "return") || "";
      if (doc.startsWith(parameter.typeDescriptions.typeString)) doc = doc.split(parameter.typeDescriptions.typeString)[1];
      builder.push(doc.trim());
      builder.push(" | ");
      builder.push("\n");
    }

    return builder.join("");
  }
};