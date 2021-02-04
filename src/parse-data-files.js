// parseDataFiles: loads a bunch of delimiter separated files from a set of directories and 
// their subdirectories based on a config object. Those loaded files are

import getFilePaths from "./get-file-paths.js";
import path from "path";

const defaultConfig = {
  excludeDirectories: [".next", "node_modules"],
  fileTypes: [
    {"extension": "csv", "delimiter": ","},
    {"extension": "tsv", "delimiter": ","}
  ],
  targetDirectories: ["."]
}

function parseDataFiles(config = defaultConfig){
  const {
    excludeDirectories,
    fileTypes,
    targetDirectories
  } = config;

  const directoryFilter = (dirName) => !excludeDirectories
    .some(dir => dirName===dir);
  const extensionFilter = (fileName) => fileTypes
    .some( type => path.extname(fileName) === `.${type.extension}`);

  const dataFileLocations = getFilePaths(targetDirectories, extensionFilter, directoryFilter)
  console.log(dataFileLocations);
}

export default parseDataFiles;