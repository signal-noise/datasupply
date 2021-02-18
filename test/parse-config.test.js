import fs from 'fs';
import parseConfig from '../src/parse-config.js';

const configFixture = JSON.parse(fs.readFileSync('./test/config-fixture.json','utf-8'));

const egCsv = 'a,b,c\n1,2,3\n4,5,"6,7"';
const egTsv = 'a\tb\tc\n1\t2\t3\n4\t5\t6,7';
const egPsv = 'a|b|c\n1|2|3\n4|5|6,7';

test('does it create the right number of parsers?', () => {
  const configuration = parseConfig(configFixture);
  expect(Object.keys(configuration.parsers).length).toBe(2);
});