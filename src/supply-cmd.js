#!/usr/bin/env node --experimental-modules
// supply-cmd
// this is a command that allows a user to parse some dataflies based on some supplied config

import * as fs from 'fs';
import * as path from 'path';

import commander from 'commander';
import parseDataFiles from './parse-data-files.js';
import transform from './transforms/index.js';

const program = new commander.Command();
program.option('-c, --config <configFileLocation>', 'the location of the Data Supply config file');
program.version('0.0.1');
program.parse(process.argv);

const options = program.opts();
const prettyJSON = '\t';
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

const transformableFiles = [];

//parse and save all the JSON files
Object.entries(dataSets).forEach(([basename, dataSet]) => {
  if (!fs.existsSync(outputPath)){
    console.warn(`CREATING ${outputPath}`);
    fs.mkdirSync(outputPath, { recursive: true });
  }
  const filePath = path.join(outputPath,`${basename}.json`);
  const fileData = JSON.stringify(dataSet, null, prettyJSON);
  if(dataSet.metadata != undefined && dataSet.metadata.transforms && dataSet.metadata.transforms.length > 0){
    transformableFiles.push(filePath);
  }

  fs.writeFileSync(filePath, fileData);
  console.warn("\x1b[32m",` - ${basename} => ${filePath}`);
});

//transform the JSON files based on their metadata
// doing this as a separate functoin rthaer than trying to roll it into the parsing/saving function
// 1. we might in the future want to keep and untransformed file or create two transfomred files from 
//  a single source
// 2. it keeps the logic separate helping debugging etc. the temptation is often to 
//  be clever with data processing and do it all in one big blob whihc makes it harder when mistakes happend 
//  to figure out where the issue might lie 
transformableFiles.forEach( filename => {
  console.warn('  - transforming in place', filename);
  const dataSet = JSON.parse(fs.readFileSync(filename));
  dataSet.data = transform.transformList(dataSet.data, dataSet.metadata.transforms);
  fs.writeFileSync(filename, JSON.stringify(dataSet, null, prettyJSON));
});
