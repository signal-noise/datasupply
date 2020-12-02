# Getting started

Using Data Supply in your project is easy; follow this guide for a quick example.

## Install Data Supply

First of all we need Data Supply available to the codebase.

```js
npm i @data-supply/core
```

## Add your data

Grab a flat file of data for your project. We're going to use the [Wikipedia example](https://en.wikipedia.org/wiki/Comma-separated_values#Example): 

```csv
Year,Make,Model,Description,Price
1997,Ford,E350,"ac, abs, moon",3000.00
1999,Chevy,"Venture ""Extended Edition""","",4900.00
1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00
1996,Jeep,Grand Cherokee,"MUST SELL!
air, moon roof, loaded",4799.00
```

Copy the above into a new file and save it as `/data/cars.csv` relative to your `package.json` file.

## Add a display component

Put a table component in somewhere

## Connect data to display

Connector syntax for sending over data table

## Make sure Data Supply runs

Webpack?

## Profit

?

## More complex integrations

So far we've not done any configuration of uniform; we've relied on its defaults to process the data and make it available. If you need to change something for your project, take a look at the [Configuration](./configuration.md) page.
