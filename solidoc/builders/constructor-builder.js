"use strict";
const nodeHelper = require("../helpers/node-helper");
const documentationHelper = require("../helpers/documentation-helper");
const templateHelper = require("../helpers/template-helper");
const i18n = require("../i18n");

module.exports = {
  build: function(contract, template) {
    function clean() {
      template = template.replace("{{ConstructorDescription}}", "");
      template = template.replace("{{ConstructorCode}}", "");
      template = template.replace("{{ConstructorHeading}}", "");
      template = template.replace("{{ConstructorArgumentsHeading}}", "");
      template = template.replace("{{ConstructorArguments}}", "");
      template = template.replace("{{TableHeader}}", "");

      return template;
    }

    if(!contract) {
      return "";
    }

    const code = [];
    const argBuilder = [];
    const parameters = [];
    const node = nodeHelper.getConstructorNode(contract) || {};
    const description = documentationHelper.getNotice(node.documentation);
    const args = ((node.modifiers || [])[0] || {}).arguments;

    if(!args || !args.length) {
      return clean();
    }

    code.push("```solidity");
    code.push("\n");
    code.push("constructor(");

    for(let i in args) {
      const argument = args[i];

      const dataType = argument.typeDescriptions.typeString.replace("contract ", "");
      const argumentDocumentation = documentationHelper.get(node.documentation, "param " + argument.name);

      parameters.push(dataType + " " + argument.name);

      argBuilder.push(`| ${argument.name} | ${dataType} | ${argumentDocumentation.replace("\r\n?|\n", " ")} | \n`);
    }

    code.push(parameters.join(", "));
    code.push(") ");
    code.push(node.visibility.toLowerCase());
    code.push("\n");
    code.push("```");

    template = template.replace("{{ConstructorHeading}}", `## ${i18n.translate("Constructor")}`);
    template = template.replace("{{ConstructorDescription}}", description);
    template = template.replace("{{ConstructorCode}}", code.join(""));
    template = template.replace("{{ConstructorArguments}}", argBuilder.join(""));

    template = template.replace("{{ConstructorArgumentsHeading}}", `**${i18n.translate("Arguments")}**`);
    template = template.replace("{{TableHeader}}", templateHelper.TableHeaderTemplate);

    return template;
  }
};