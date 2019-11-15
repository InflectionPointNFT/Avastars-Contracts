#!/usr/bin/env node
"use strict";

const path = require("path");
const resolve = require("path").resolve;
const fs = require("fs-extra");
const compiler = require("./utils/compiler");
const pino = require("pino");
const parser = require("./parser");
const generator = require("./generator");

const logger = pino({
  prettyPrint: true
});

/***********************************************************************************************
    Arguments:
    1. Path to truffle project root.
    2. Path to generate documentation to.
    3. Compile. Optional, default: false.
    4. Language. Optional, default: en.
*************************************************************************************************/
function getConfig() {
  function readConfig() {
    const file = path.join(process.cwd(), "solidoc.json");

    if(!fs.pathExistsSync(file)) {
      logger.info(`No solidoc.json`);
      return {};
    }

    const contents = fs.readFileSync(file);
    const config = JSON.parse(contents.toString());

    return config;
  }

  var config = readConfig();
  const args = process.argv;

  if(args.length > 6) {
    logger.error(`Invalid command ${process.argv.join(" ")}`);
    return;
  }

  if(args.length > 2) {
    config.pathToRoot = args[2];
    config.outputPath = args[3];
    config.compile = (args[4] || "").toLowerCase() === "true";
    config.language = args[5] || "en";
  }

  config.pathToRoot = resolve(config.pathToRoot);
  config.outputPath = resolve(config.outputPath);

  return config;
}

const config = getConfig();
global.config = config;

if(!config.pathToRoot) {
  logger.error("Path to truffle project root was not specified.");
  return;
}

const buildDirectory = path.join(config.pathToRoot, "build");
const sourceDirectory = path.join(config.pathToRoot, "contracts");

if(!fs.existsSync(config.pathToRoot)) {
  logger.error("Invalid directory: %s.", config.pathToRoot);
  return;
}

function begin() {
  if(!fs.existsSync(buildDirectory)) {
    logger.error("Please build your project first or run solidoc with recompilation on.");
    return;
  }

  if(!fs.existsSync(config.outputPath)) {
    logger.info("Create the directory for the output path: %s.");
    fs.mkdirSync(config.outputPath);
  }

  const sources = parser.enumerate((sourceDirectory));
  const contracts = parser.parse(buildDirectory);
  generator.serialize(contracts, sources, config.outputPath);
}

if(config.compilation) {
  fs.removeSync(buildDirectory);

  logger.info("Removed %s.", buildDirectory);
  compiler.compile(config.pathToRoot, begin);
  return;
}

begin();