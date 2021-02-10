import dataSupply from '../src/index.js';

const withMetaData = './test/example-data/political-data/elections/polling-data.csv';
const withoutMetaData = './test/example-data/scientific-data/periodic-table.csv';

test('does it find metadata when it\'s available', () => {
  const files = dataSupply.getFilePaths([fixtureDataPath]);
  expect(files.length).toBe(8);
});
