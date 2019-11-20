"use strict";

const path = require("path");
const fs = require("fs-extra");

function read(fileName) {
  function getPath() {
    const file = path.join(__dirname, "..", "templates", fileName);
    const override = path.join(process.cwd(), ".solidoc", "templates", fileName);

    if(fs.existsSync(override)) {
      return override;
    };

    return file;
  }

  const file = getPath();
  const contents = fs.readFileSync(file);
  return contents.toString();
}

module.exports = {
  ContractTemplate: read("contract.md"),
  EventTemplate: read("event.md"),
  FunctionTemplate: read("function.md"),
  ModifierTemplate: read("modifier.md"),
  TableHeaderTemplate: read("table-header.md"),
  SidebarTemplate: read("sidebar.md")
};