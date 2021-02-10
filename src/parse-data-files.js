// parseDataFiles: loads a bunch of delimiter separated files from a set of directories and 
// their subdirectories based on a config object. Those loaded files are

import YAML from "yaml";
import fs from "fs";
import parseConfig from "./parse-config.js";
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
  return {};
}

function parseFileList(fileList, parser){
  const dataSets = {};
  fileList.forEach(filePath => {
    const extension = path.extname(filePath);
    let name = path.basename(filePath, extension);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    if(dataSets[name] !== undefined){
      console.warn(`\x1b[31mWARNING Duplicate dataset name "${name}" from ${filePath} will become "${name}_"`);
      console.warn(`  you may want to rename your source files and re-run to avoid confusion`);
      name = `${name}_`;
    }
    dataSets[name] = {};

    dataSets[name].data = parser[extension]
      .parse(fileContent);
    const metadata = seekMetaData(filePath);
    if(metadata !== undefined) {
      dataSets[name].metadata = metadata;
      dataSets[name].metadata.__retrieved = new Date();
    }
  });
  return dataSets;
}

export default function parseDataFiles(config = defaultConfig){
  const {
    fileLocations,
    parsers
  } = parseConfig(Object.assign(defaultConfig, config))
  
  return parseFileList(fileLocations, parsers);
};
