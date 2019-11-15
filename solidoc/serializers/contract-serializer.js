"use strict";
const documentationHelper = require("../helpers/documentation-helper");
const nodeHelper = require("../helpers/node-helper");
const constructorBuilder = require("../builders/constructor-builder");
const i18n = require("../i18n");
const util = require("util");

module.exports = {
  serialize: function(contract, template, contracts, sources) {
    function getTitle() {
      const contractNode = nodeHelper.getContractNode(contract);
      const documentation = contractNode.documentation;
      const contractTitle = documentationHelper.get(documentation, "title");

      let title = `${contract.contractName}.sol`;

      if(contractTitle) {
        title = `${contractTitle.replace("\r\n", "\n")}`;
      }

      return title;
    }

    function getAbi() {
      const builder = [];
      builder.push("## ");
      builder.push(i18n.translate("ABI"));
      builder.push("\n\n");
      builder.push("```json\n");
      builder.push(JSON.stringify(contract.abi, null, 2));
      builder.push("\n```");

      return builder.join("");
    }

    function getContractPath() {
      const sourcePath = contract.sourcePath;
      const file = sourcePath.replace(global.config.pathToRoot, "");
      const link = `[${file.replace(/^\/|\/$/g, '')}](${[global.config.repoUrl, file.replace(/^\/|\/$/g, '')].join('')})`;

      return util.format(i18n.translate("ViewSource"), link);
    }

    function getAnchors() {
      const anchors = [];

      for(let i in contracts) {
        const contract = contracts[i];

        const anchor = `* [${contract.contractName}](${contract.contractName}.md)`;
        anchors.push(anchor);
      }

      return anchors;
    }

    function getLocalAnchors() {
      let list = contracts.filter(
          contract => sources.some(source => source === contract.sourcePath)
      );

      let anchors = list.map(contract => `* [${contract.contractName}](${contract.contractName}.md)`);

      return anchors;
    }

    function getForeignAnchors() {
      let list = contracts.filter(
          contract => !sources.some(source => source === contract.sourcePath)
      );

      let anchors = list.map(contract => `* [${contract.contractName}](${contract.contractName}.md)`);

      return anchors;
    }

    function getInheritancePath() {
      const dependencyList = [];
      const dependencies = nodeHelper.getBaseContracts(contract);

      for(let i in dependencies) {
        const dependency = dependencies[i];
        dependencyList.push(`[${dependency.baseName.name}](${dependency.baseName.name}.md)`);
      }

      if(dependencyList && dependencyList.length) {
        return `**${util.format(i18n.translate("Extends"), dependencyList.join(", "))}**`;
      }

      return "";
    }

    function getImplementation() {
      const implementationList = [];
      const implementations = nodeHelper.getImplementations(contract, contracts);

      for(let i in implementations) {
        const implementation = implementations[i];

        implementationList.push(`[${implementation.contractName}](${implementation.contractName}.md)`);
      }

      if(implementationList && implementationList.length) {
        return `**${util.format(i18n.translate("DerivedContracts"), implementationList.join(", "))}**`;
      }

      return "";
    }

    const contractNode = nodeHelper.getContractNode(contract);
    const documentation = contractNode.documentation;
    const notice = documentationHelper.getNotice(documentation);

    template = template.replace("{{ContractName}}", contract.contractName);
    template = template.replace("{{ContractPath}}", getContractPath());
    template = template.replace("{{ContractTitle}}", getTitle());
    template = template.replace("{{ContractDescription}}", notice);
    template = template.replace("{{ContractInheritancePath}}", getInheritancePath());
    template = template.replace("{{ContractImplementations}}", getImplementation());
    template = template.replace("{{LocalContractsAnchor}}", getLocalAnchors().join("\n"));
    template = template.replace("{{ForeignContractsAnchor}}", getForeignAnchors().join("\n"));
    template = template.replace("{{ABI}}", getAbi());

    return constructorBuilder.build(contract, template);
  }
};