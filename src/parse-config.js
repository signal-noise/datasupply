import dsv from "d3-dsv";
import getFilePaths from "./get-file-paths.js";
import path from "path";

// parse config takes a configuration object 
//  finds all the paths for relevant files nvm
//  and creates relevant parser functions for 
//  different file extensions
export default function parseConfig(config) {
  const {
    excludeDirectories,
    fileTypes,
    dataSourceDirectories
  } = config;
  // create filtering functions from the config object 
  const directoryFilter = (dirName) => !excludeDirectories.some(dir => dirName === dir);
  const extensionFilter = (fileName) => fileTypes
    .some(type => path.extname(fileName) === `.${type.extension}`);

  // create parsers for all extenions/ delimiters specified in the config object
  const parsers = {};
  fileTypes.forEach(type => {
    parsers[`.${type.extension}`] = dsv.dsvFormat(type.delimiter);
  });

  const parserList = [];
  fileTypes.forEach(type => {
    parserList.push((filePath) => {
      const extension = path.extname(filePath);
      if (`.${type.extension}` == extension) {
        return dsv.dsvFormat(type.delimiter);
      }
      return d => d;
    });
  });

  const fileLocations = getFilePaths(dataSourceDirectories, extensionFilter, directoryFilter);

  return { parsers, fileLocations };
}
