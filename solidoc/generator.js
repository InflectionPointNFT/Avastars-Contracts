"use strict";
const pino = require("pino");
const path = require("path");
const fs = require("fs");
const temp = require("./helpers/template-helper");
const logger = pino({
  prettyPrint: true
});

function serializeContract(contract, contracts, sources) {
  let template = temp.ContractTemplate;

  require("require-all")({
    dirname: path.join(__dirname, "serializers"),
    filter: /(.+serializer)\.js$/,
    resolve: function(serializer) {
      template = serializer.serialize(contract, template, contracts, sources);
    }
  });

  return template;
}

function getLocalAnchors(contracts, sources) {
  let list = contracts.filter(
      contract => sources.some(source => source === contract.sourcePath)
  );
  return getAnchors(list);
}

function getForeignAnchors(contracts, sources) {
  let list = contracts.filter(
      contract => !sources.some(source => source === contract.sourcePath)
  );
  return getAnchors(list);
}

function getAnchors(list) {
  return list.map(contract => `\t* [${contract.contractName}](${contract.contractName}.md)`);
}

function createSidebar(contracts, sources) {
  let template = temp.SidebarTemplate;

  template = template.replace("{{LocalContractsAnchor}}", getLocalAnchors(contracts, sources).join("\n"));
  template = template.replace("{{ForeignContractsAnchor}}", getForeignAnchors(contracts, sources).join("\n"));

  return template;
}

module.exports = {
  serialize: function(contracts, sources, outputDirectory) {
    logger.info("Total contracts: %s.", contracts.length);

    // Contracts
    for(let i = 0; i < contracts.length; i++) {
      const contract = contracts[i];
      const result = serializeContract(contract, contracts, sources).replace(/[\r\n]\s*[\r\n]/g, "\n\n");
      const file = path.join(outputDirectory, `${contract.contractName}.md`);

      logger.info("Writing %s.", file);
      fs.writeFileSync(file, result);
    }

    // Sidebar
    const sidebar = createSidebar(contracts, sources);
    const file = path.join(outputDirectory, `_sidebar.md`);
    logger.info("Writing %s.", file);
    fs.writeFileSync(file, sidebar);

    // console.log(serializers.length);
  }
};