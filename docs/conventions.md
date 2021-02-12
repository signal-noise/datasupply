# Data Supply Conventions

## Metadata
_Data supply_ will associate certain files together. If it finds a source data file, it will look for a correspondingly named metadata file to provide information about that data.
e.g. if __data supply__ finds `population.csv` it will look for `population.yml`.

Metadata files allow you to specify the types of data columns in your source data, as well as any other metadata your project might need to consume alongside the data.

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
