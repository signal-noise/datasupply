const fs = require("fs");

jest.mock("fs");

// Empty Mock directory structure
const NO_CSV_IN_DATA_DIR_CONFIG = {};

// Mock directory structure containing a mock csv in a data directory.
const CSV_IN_DATA_DIR_CONFIG = {
  "./data/example.csv": "These\t are\t csv\t headers\n This\t is\t first\t row",
};

describe("dataFileLookup()", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test("data file found", () => {
    //fs.existsSync.mockReturnValue(true);
    // require("fs").existsSync(false);
    // some test
    fs.existsSync = () => true;

    // create a temporary file system in memory with data/example.csv
    require("fs").__setMockFiles(CSV_IN_DATA_DIR_CONFIG);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    require("./index.mjs");

    expect(consoleSpy.mock.calls).toEqual([
      ["Starting from dir ./"],
      ["no dir ", "."], // ["-- found: ", "example.csv"],
    ]);
    expect(console.log).toBeCalledTimes(2);
  });

  test("No directories found", () => {
    fs.existsSync = () => false;
    //fs.existsSync.mockReturnValue(false);
    // require("fs").existsSync(false);
    require("fs").__setMockFiles(NO_CSV_IN_DATA_DIR_CONFIG);
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    require("./index.mjs");

    //console.log(spy.mock.calls);
    expect(consoleSpy.mock.calls).toEqual([
      ["Starting from dir ./"],
      ["no dir ", "."],
    ]);
    expect(console.log).toBeCalledTimes(2);
  });

  test("No files of type csv or tsv found", () => {
    ////fs.existsSync.mockReturnValue(false);
    fs.existsSync = () => false;
    // require("fs").existsSync(false);
    require("fs").__setMockFiles(NO_CSV_IN_DATA_DIR_CONFIG);
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    require("./index.mjs");

    //console.log(spy.mock.calls);
    expect(consoleSpy.mock.calls).toEqual([
      ["Starting from dir ./"],
      ["no dir ", "."],
    ]);
    expect(console.log).toBeCalledTimes(2);
  });

  test("should directory be excluded", () => {});

  test("files of type csv or tsv found", () => {});
});
