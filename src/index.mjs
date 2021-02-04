// npm run dataSupply
// fs. check directory structure for csv or tsv files
// if found, pass found csv name to Components
// write tests, maybe a test runner during setup?

import config from "./config.json";
import createStream from "./createStream.mjs";
import fs from "fs";
import path from "path";

const testing = typeof jest !== "undefined";

// default dirs to exclude
const dirsToExclude = ["node_modules"];
const csvsFound = [];

const {
  excludeDirectories,
  fileTypes,
  targetDirectory,
  columnSeparator,
} = config;

// push any user defined directories to be excluded to arr
excludeDirectories.length !== 0 &&
  excludeDirectories.forEach((directory) => dirsToExclude.push(directory));

/**
 * @param {string} fileName
 * @param {array} filters
 */
function detectFiltersInFileName(fileName, filters) {
  return filters.some((ext) => fileName.indexOf(ext) >= 0);
}

/**
 * @param {string} startPath
 * @param {string} file
 */
function createPath(startPath, file) {
  return path.join(startPath, file);
}

/**
 * @param {string} fileName
 */
function checkIfDirectoryIsExcluded(fileName) {
  return dirsToExclude.includes(fileName);
}

/**
 * @param {string} fileName
 * @param {array} filter
 */
function recurseOrPushFoundFile(fileName, filter) {
  const stat = fs.lstatSync(fileName);
  const shouldBeExcluded = checkIfDirectoryIsExcluded(fileName);

  // check if is directory or if file name exists in dirsToExclude
  if (stat.isDirectory() && !shouldBeExcluded) {
    dataFileLookup(fileName, filter); //recurse
    // if current filename extension exist in filter array
  } else if (detectFiltersInFileName(fileName, filter)) {
    console.log("-- found: ", fileName);
    csvsFound.push(fileName);
  }
}

// dataFileChecker(targetDirectory, fileTypes);
/**
 * @param {array} filter
 * @param {string} startPath
 * check given directory structure fir
 */
export default function dataFileLookup(
  startPath = ".",
  filter = ["csv", "tsv"]
) {
  console.log("Starting from dir " + startPath + "/");

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  try {
    const files = fs.readdirSync(startPath);

    for (let i = 0; i < files.length; i++) {
      const fileName = createPath(startPath, files[i]);
      recurseOrPushFoundFile(fileName, filter);
    }
    return files;
  } catch (err) {
    console.error(err);
  }
}

dataFileLookup(targetDirectory, fileTypes);

// if some CSVS have been found parse them.
if (!testing || csvsFound.length !== 0)
  createStream(csvsFound, columnSeparator);
