#!/usr/bin/env node
// supply-cmd
// this is a command that allows a user to parse some dataflies based on some supplied config
// inspiration https://clig.dev/ CLI Guidelines

import * as fs from "fs";

import parseDataFiles from "./parse-data-files.js";

let configPath;

if(fs.existsSync(configPath)){
  config = fs.readFileSync(configPath)
}else{
  console.warn('Data supply - Using default config');
}

const dataSets = parseDataFiles(configPath);

const report = [];

Object.entries(dataSets).forEach(([basename, dataSet]) => {
  const filePath = `./example-data/output/${basename}.json`;
  const fileData = JSON.stringify(dataSet, null, '\t');
  fs.writeFileSync(filePath, fileData);
  console.warn(`${basename} > to > ${filePath}`);
});
