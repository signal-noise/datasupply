#!/usr/bin/env -S node --experimental-modules

// supply-cmd
// this is a command that allows a user to parse some dataflies based on some supplied config

import * as fs from "fs";
import * as path from "path";

import commander from 'commander';
import parseDataFiles from "./parse-data-files.js";

const program = new commander.Command();
program.option('-c, --config <configFileLocation>', 'the location of the Data Supply config file');
program.version('0.0.1');
program.parse(process.argv);

const options = program.opts();

// files will be read and written relative to the path of the config file if one exists,
// otherwise relative to the present working directory
// (the place form which the script was invoked)
let inputConfigPath = options.config ? options.config : './.datasupplyrc';

let outputPath = '.';
let configPath = path.join(process.env.PWD, inputConfigPath);
let config = undefined;

if(inputConfigPath && fs.existsSync(configPath)){ // if the specified file exists load it and get the output path
  config = JSON.parse(fs.readFileSync(configPath));
  outputPath = config.outputDirectory ? config.outputDirectory : process.env.PWD;
}else{
  configPath = process.env.PWD; // for the purpose of determining the output path the config path is the PWD
  console.warn('Data supply - Using default config', process.env.PWD);
}

// the config path is relative to the location of 
// 1. the configuration file or if not then 
// 2. the present working directory
if(!fs.lstatSync(configPath).isDirectory()){
  configPath = path.dirname(configPath)
}
outputPath = path.join(configPath, outputPath); 
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
