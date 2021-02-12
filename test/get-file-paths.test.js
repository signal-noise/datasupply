import dataSupply from '../src/index.js';

const fixtureDataPath = './test/example-data';

test('does it find all the files in "example-data"?', () => {
  const files = dataSupply.getFilePaths([fixtureDataPath]);
  expect(files.length).toBe(8);
});

test('does it find all csv the files in "example-data"?', () => {
  const files = dataSupply.getFilePaths([fixtureDataPath], (f)=>f.indexOf(".csv")>1);
  expect(files.length).toBe(6);
});

test('does it find all csv the files in "example-data", exluding those in "political-data"?', () => {
  const files = dataSupply.getFilePaths([fixtureDataPath], (f)=>f.indexOf(".csv")>1, (dirName) => dirName != 'political-data');
  expect(files.length).toBe(3);
});


// [
//   'example-data/political-data/elections/polling-data.csv',
//   'example-data/political-data/elections/polling-data.yml',
//   'example-data/political-data/elections/uk-electoral-turnout.csv',
//   'example-data/political-data/london-hpi.csv',
//   'example-data/scientific-data/periodic-table.csv',
//   'example-data/scientific-data/sugarydrinks.csv',
//   'example-data/sports-data/circuits.csv',
//   'example-data/dummy.tsv'
// ]