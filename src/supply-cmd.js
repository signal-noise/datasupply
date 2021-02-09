#!/usr/bin/env node
// supply-cmd
// this is a command that allows a user to parse some dataflies based on some supplied config
// inspiration https://clig.dev/ CLI Guidelines

import * as fs from "fs";
import * as path from "path";

import Command from 'commander';
import parseDataFiles from "./parse-data-files.js";

// console.log(Command);
// const program = new Command();
// program.option('-c, --config <configFileLocation>', 'the location of the Data Supply config file');
// program.version('0.0.1');

// const options = program.opts();

// console.log(options);

// files will be read and written relative to the path of the config file if one exists,
// otherwise relative to the present working directory
// (the place form which the script was invoked)
let inputConfigPath = './supply-config.json';
let configPath = path.join(process.env.PWD, inputConfigPath);
let outputConfigPath = '.';
let outputPath = path.join(path.dirname(configPath), outputConfigPath);


if(inputConfigPath && fs.existsSync(configPath)){
  config = fs.readFileSync(configPath);
}else{
  configPath = undefined;
  console.warn('Data supply - Using default config');
}

const dataSets = parseDataFiles(configPath);

Object.entries(dataSets).forEach(([basename, dataSet]) => {
  // the output directory should be relative to the config filepath
  console.log('OUTPUT:', outputPath);
  if (!fs.existsSync(outputPath)){
    console.warn(`creating ${outputPath}`);
    fs.mkdirSync(outputPath);
  }
  const filePath = path.join(outputPath,`${basename}.json`);
  const fileData = JSON.stringify(dataSet, null, '\t');
  fs.writeFileSync(filePath, fileData);
  console.warn("\x1b[32m",` - ${basename} => ${filePath}`);
});
