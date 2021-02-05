//@TODO write more tests, maybe a test runner during setup?

import config from "./config.json";
import createStream from "./createStream.mjs";
import fs from "fs";
import { getFileFromPath } from "./utils.js";
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
function detectFiltersInFileName(filePath, filters) {
  return filters.some((ext) => getFileFromPath(filePath).indexOf(ext) >= 0);
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

/**
 * @param {array} filter
 * @param {string} startPath
 * check given directory structure for
 * provided data file types
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
