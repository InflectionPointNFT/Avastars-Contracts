"use strict";

module.exports = {
  getReturnParameters: function(node) {
    return node.returnParameters.parameters;
  }
};