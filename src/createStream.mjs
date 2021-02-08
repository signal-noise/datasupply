import { getFileFromPath, removeExtension } from "./utils.js";

import csv from "csv-parser";
import fs from "fs";
import saveJson from "./saveJson.mjs";

const dataSupply = {};

/**
 * @param {array} csvsFound
 * @param {string} separator
 */
export default function (csvsFound, separator) {
  csvsFound.forEach((csvPath) => {
    const getKey = getFileFromPath(csvPath);
    try {
      dataSupply[getKey] = [];
      const jsonFileName = removeExtension(getFileFromPath(csvPath));
      fs.createReadStream(csvPath)
        .pipe(csv({ separator }))
        .on("data", (data) => {
          dataSupply[getKey].push(data);
        })
        .on("end", () => {
          // save to json file, in the data directory
          // next step, to pass this directly to a Redux store or Context?
          saveJson(dataSupply, `src/data/${jsonFileName}.json`);
        });
    } catch (err) {
      console.error(err);
    }
  });
}
