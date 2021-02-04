import csv from "csv-parser";
import fs from "fs";
import saveJson from "./saveJson.mjs";

const dataSupply = {};

/**
 * @param {array} csvsFound
 * @param {string} separator
 */
export default function (csvsFound, separator) {
  // return a top level data structure that contains all CSVs parsed, using filepath as key
  // returned data structure something to defined in config?

  csvsFound.forEach((csvPath) => {
    try {
      dataSupply[csvPath] = [];

      fs.createReadStream(csvPath)
        .pipe(csv({ separator }))
        .on("data", (data) => {
          dataSupply[csvPath].push(data);
        })
        .on("end", () => {
          // save to json file, in the data directory
          // next step, to pass this directly to a Redux store or Context
          saveJson(dataSupply, "src/data/processedData.json");
        });
    } catch (err) {
      console.error(err);
    }
  });
}
