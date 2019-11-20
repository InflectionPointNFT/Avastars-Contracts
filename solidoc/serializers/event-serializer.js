"use strict";
const nodeHelper = require("../helpers/node-helper");
const enumerable = require("linq");
const templateHelper = require("../helpers/template-helper");
const documentationHelper = require("../helpers/documentation-helper");
const codeBuilder = require("../builders/event-code-builder");
const argumentBuilder = require("../builders/argument-builder");
const i18n = require("../i18n");

module.exports = {
  serialize: function(contract, template, contracts) {
    function clean() {
      template = template.replace("{{EventTitle}}", "");
      template = template.replace("{{EventList}}", "");
      template = template.replace("{{AllEvents}}", "");
      return template;
    }

    const eventNodes = nodeHelper.getEvents(contract);

    if(!eventNodes || !eventNodes.length) {
      return clean();
    }

    const definitionList = [];
    const functionList = enumerable.from(eventNodes).select(function(x) {
      const parameters = x.parameters.parameters || [];
      const parameterList = [];

      for(let i in parameters) {
        const parameter = parameters[i];
        const argumentName = parameter.name;
        const dataType = parameter.typeDescriptions.typeString.replace("contract ", "");
        parameterList.push(`${dataType} ${argumentName}`);
      }

      return `- [${x.name}](#${x.name.toLowerCase()})`;
    }).toArray();

    template = template.replace("{{EventTitle}}", `## **${i18n.translate("Events")}**`);

    for(let i in eventNodes) {
      const node = eventNodes[i];

      let eventTemplate = templateHelper.EventTemplate;
      const description = documentationHelper.getNotice(node.documentation);
      const eventCode = codeBuilder.build(node);
      let parameters = (node.parameters || {}).parameters;
      const args = argumentBuilder.build(node.documentation, parameters);

      eventTemplate = eventTemplate.replace("{{EventName}}", node.name);
      eventTemplate = eventTemplate.replace("{{EventNameHeading}}", `### ${node.name}`);
      eventTemplate = eventTemplate.replace("{{EventDescription}}", description);
      eventTemplate = eventTemplate.replace("{{EventCode}}", eventCode);

      eventTemplate = eventTemplate.replace("{{EventArgumentsHeading}}", args ? `**${i18n.translate("Arguments")}**` : "");
      eventTemplate = eventTemplate.replace("{{ArgumentTableHeader}}", args ? templateHelper.TableHeaderTemplate : "");
      eventTemplate = eventTemplate.replace("{{EventArguments}}", args ? args : "");

      definitionList.push(eventTemplate);
    }

    template = template.replace("{{EventList}}", functionList.join("\n"));
    template = template.replace("{{AllEvents}}", definitionList.join("\n"));

    return template;
  }
};
