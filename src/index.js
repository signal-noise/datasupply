import * as fs from "fs";

import parseDataFiles from "./parse-data-files.js";

const dataSets = parseDataFiles();

Object.entries(dataSets).forEach(([basename,dataSet]) => {
  fs.writeFileSync(`./example-data/output/${basename}.json`, JSON.stringify(dataSet, null, '\t'));
});
