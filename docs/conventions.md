# Data Supply Conventions

## Metadata
_Data supply_ will associates certain files together. If it finds a CSV it will look for a corespondingly named YAML file to provide infomration about that data.
e.g. if __data supply__ finds `population.csv` it will look for `population.yml`.

Metadata files might tell the you about the types of data columns

Continuing the previous example if a row of data in `population.csv` looks like this...
```json
{
  "city":"London",
  "population":"8982000",
  "date":"2019"
}
```
`population.yml` might look like this
```yaml
__Title: The populations of cities in the UK
city: String
population: Number
date:
 - Date
 - "%Y"
```

at the moment __data supply__ doesn't make use of this metadata but it does get attached to the  