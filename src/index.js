import * as fs from "fs";

import parseDataFiles from "./parse-data-files.js";

const dataSets = parseDataFiles();

Object.entries(dataSets).forEach(([basename, dataSet]) => {
  const filePath = `./example-data/output/${basename}.json`;
  const fileData = JSON.stringify(dataSet, null, '\t')
  fs.writeFileSync(filePath, fileData);
});
