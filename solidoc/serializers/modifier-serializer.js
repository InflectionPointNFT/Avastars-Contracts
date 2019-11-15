"use strict";
const nodeHelper = require("../helpers/node-helper");
const enumerable = require("linq");
const templateHelper = require("../helpers/template-helper");
const documentationHelper = require("../helpers/documentation-helper");
const argumentBuilder = require("../builders/argument-builder");
const codeBuilder = require("../builders/modifier-code-builder");
const i18n = require("../i18n");

module.exports = {
  serialize: function(contract, template) {
    function clean() {
      template = template.replace("{{ModifierTitle}}", "");
      template = template.replace("{{ModifierList}}", "");
      template = template.replace("{{AllModifiers}}", "");

      return template;
    }

    var modifierNodes = nodeHelper.getModifiers(contract);

    if(!modifierNodes || !modifierNodes.length) {
      return clean();
    }

    const definitionList = [];
    const modifierList = enumerable.from(modifierNodes).select(function(x) {
      return `- [${x.name}](#${x.name.toLowerCase()})`;
    }).toArray();

    template = template.replace("{{ModifierTitle}}", `## ${i18n.translate("Modifiers")}`);

    for(let i in modifierNodes) {
      const node = modifierNodes[i];

      let modifierTemplate = templateHelper.ModifierTemplate;
      const description = documentationHelper.getNotice(node.documentation);

      modifierTemplate = modifierTemplate.replace("{{ModifierArgumentsHeading}}", `**${i18n.translate("Arguments")}**`);
      modifierTemplate = modifierTemplate.replace("{{TableHeader}}", templateHelper.TableHeaderTemplate);
      modifierTemplate = modifierTemplate.replace("{{ModifierNameHeading}}", `### ${node.name}`);
      modifierTemplate = modifierTemplate.replace("{{ModifierDescription}}", description);
      modifierTemplate = modifierTemplate.replace("{{ModifierCode}}", codeBuilder.build(node));
      modifierTemplate = modifierTemplate.replace("{{ModifierArguments}}", argumentBuilder.build(node.documentation, node.parameters.parameters));

      definitionList.push(modifierTemplate);
    }

    template = template.replace("{{ModifierList}}", modifierList.join("\n"));
    template = template.replace("{{AllModifiers}}", definitionList.join("\n"));

    return template;
  }
};
