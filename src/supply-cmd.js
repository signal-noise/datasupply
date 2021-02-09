#!/usr/bin/env node
// supply-cmd
// this is a command that allows a user to parse some dataflies based on some supplied config

import * as fs from "fs";
import * as path from "path";

import { Command } from 'commander';
import parseDataFiles from "./parse-data-files.js";

const program = new Command();
program.option('-c, --config <configFileLocation>', 'the location of the Data Supply config file');
program.version('0.0.1');
program.parse(process.argv);

const options = program.opts();

// files will be read and written relative to the path of the config file if one exists,
// otherwise relative to the present working directory
// (the place form which the script was invoked)
let inputConfigPath = options.config ? options.config : './supply-config.json';


let outputPath = '.';
let configPath = path.join(process.env.PWD, inputConfigPath);
let config = undefined;

if(inputConfigPath && fs.existsSync(configPath)){
  config = JSON.parse(fs.readFileSync(configPath));
  outputPath = config.outputDirectory ? config.outputDirectory : '.';
}else{
  configPath = undefined;
  console.warn('Data supply - Using default config');
}

// the config path is relative to the location of 1. the configuration file or if not then 2. the present working directory
outputPath = path.join(path.dirname(configPath), outputPath); 

const dataSets = parseDataFiles(config);

Object.entries(dataSets).forEach(([basename, dataSet]) => {
  if (!fs.existsSync(outputPath)){
    console.warn(`CREATING ${outputPath}`);
    fs.mkdirSync(outputPath, { recursive: true });
  }
  const filePath = path.join(outputPath,`${basename}.json`);
  const fileData = JSON.stringify(dataSet, null, '\t');
  fs.writeFileSync(filePath, fileData);
  console.warn("\x1b[32m",` - ${basename} => ${filePath}`);
});
