// parseDataFiles: loads a bunch of delimiter separated files from a set of directories and 
// their subdirectories based on a config object. Those loaded files are

import * as dsv from "d3-dsv";

import YAML from "yaml";
import fs from "fs";
import getFilePaths from "./get-file-paths.js";
import path from "path";

const defaultConfig = {
  excludeDirectories: [".next", "node_modules"],
  fileTypes:[
    {"extension": "csv", "delimiter": ","},
    {"extension": "tsv", "delimiter": "\t"}
  ],
  targetDirectories: [process.env.PWD]
}

function seekMetaData(filePath){
  const ext = path.extname(filePath);
  const metaDataPath = filePath.replace(ext,'.yml');
  if(fs.existsSync(metaDataPath)){
    const yml = YAML.parse(fs.readFileSync(metaDataPath,'utf-8'));
    return yml;
  }
  return undefined;
}

function parseDataFiles(config = defaultConfig){
  console.log("CONFIG", config);
  
  const {
    excludeDirectories,
    fileTypes,
    targetDirectories
  } = config;

  const directoryFilter = (dirName) => !excludeDirectories.some(dir => dirName === dir);
  const extensionFilter = (fileName) => fileTypes
    .some( type => path.extname(fileName) === `.${type.extension}`);

  const dataFileLocations = getFilePaths(targetDirectories, extensionFilter, directoryFilter);
  
  const dataSets = {};
  const parser = {}; 
  fileTypes.forEach(type=>{
    parser[`.${type.extension}`] = dsv.dsvFormat(type.delimiter);
  });
  
  dataFileLocations.forEach(filePath => {
    const extension = path.extname(filePath);
    const name = path.basename(filePath, extension);
    dataSets[name] = {};
    
    dataSets[name].data = parser[extension]
      .parse(fs.readFileSync(filePath, 'utf-8'));
    const metadata = seekMetaData(filePath);
    if(metadata !== undefined) {
      dataSets[name].metadata = metadata;
    } 
  });

  return dataSets;
}

export default parseDataFiles;