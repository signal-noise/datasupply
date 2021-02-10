# Data Supply

[![NPM version](https://img.shields.io/npm/v/@datasupply/datasupply.svg)](https://www.npmjs.com/package/@datasupply/datasupply) [![Actions Status](https://github.com/signal-noise/datasupply/workflows/Test%20and%20Lint/badge.svg)](https://github.com/signal-noise/datasupply/actions) [![NPM Downloads](https://img.shields.io/npm/dm/@datasupply/datasupply.svg)](https://npmcharts.com/compare/@datasupply/datasupply?minimal=true)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section --> [![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg)](#contributors-)<!-- ALL-CONTRIBUTORS-BADGE:END -->

> Data Supply is an opinionated data processing, provision and presentation library of components for Javascript

> ❗ Please note this project is under early active development and probably not suitable for use yet.

## Why use Data Supply

The __data supply__ toolset allows you to create a front end Javascript application for data visualisation and manipulation quickly and easily. Using __data supply__ will make it easier to spend time on the presentation of your data, by making predictable decisions in order to get your data from files to components.

If you use Data Supply on many projects your display components will have more predictable, consistent interfaces, and will therefore be more reusable.

## What Data Supply is

Data Supply is a set of opinionated libraries and configurations that save time for front end Javascript applications that deal with presenting data sets.

It is extensible and flexible, and should be usable with any modern browser-based Javascript project regardless of framework, with any file format and with any display component or library.

Data Supply is usable with no knowledge of how it works, but it's also easy to reason about, investigate and extend should you need to.

## What Data Supply is not

Data Supply is not an ORM or a database. It's not magic, and it's not a great leap forward. It does not do anything you can't do yourself using popular libraries. It just handles the boring stuff predictably so you don't have to.

Data Supply is not closed or restrictively licensed. Use it as much as you like on anything you like. If you do something useful with it, please consider opening a PR back into the librbary so others can benefit.

## What Data Supply does

Data Supply consumes data from static file sources such as JSON and CSV files and allows you to predictably use that data in display components with a minimum of boilerplate. By using clear conventions and pragmatic defaults, Data Supply cuts out a lot of the boiletplate connecting data sources to stores and then via filtering and related functionality to display components.

Data Supply looks for a configuration file, and falls back to pragmatic defaults for any options that aren't configured. All the important decisions it takes can be overridden with configuration. All the important format- or framework-specific code it uses is pluggable and can be swapped out.

When Data Supply runs, it:

- looks for data files in the project directory and converts them to its internal store using a sensible and performant representation
- creates filters that can be easily combined and extended to retrieve slices of data
- creates components and functions that can be used to connect the data (filtered or not) to the component of your choice
- uses headings in the data file as column / parameter names for predictable data retrieval

## What Data Supply does not do

Data Supply does not make data relational, or know about relational data. It doesn't store data persistently. It doesn't make or receive network requests. It doesn't do any "magical" things that are hard to understand.

### What Data Supply may come to do

Please see the [roadmap](./docs/roadmap.md).

> Read more [documentation](./docs/index.md)

## Usage

### Installation
Install the package (or if you're developing locally `npm link` it)
### Command line
__data supply__ provides a CLI.

Type `supply`.

Starting at the place where you typed `supply` __data supply__ will visit all subdirectories find all CSV and TSV data files (and possibly YAML metadata files (c.f. [conventions](docs/conventions.md))) and convert them to JSON in using the standard array-of-objects format:

```json
{
  "data":[
    {
      "spreadsheet column 1":"value one",
      "spreadsheet column 2":"value two",
      "spreadsheet column 3":"value three"
    },
    ...
  ],
  "metadata":{
    ...
  }
}
```

`supply` will look for a `supply-config.json` file in the location from which it was invoked. 
If it doesn't find one it runs with default options...
```json
{
  "excludeDirectories": [".next", "node_modules"],
  "fileTypes":[
    {"extension": "csv", "delimiter": ","},
    {"extension": "tsv", "delimiter": "\t"}
  ],
  "targetDirectories": ["."]
}
```

To specify your own config file you can type `supply --config ./path/to/my/supply-config.json` 

Paths specified in supply-config files are relative to the location of that file so for example if in the config you set
```json
{
  "targetDirectories":["spreadsheet-stash", "/global-data"]
}
```
then the script will look to source data from `/path/to/the/config-file-directory/spreadsheet-stash`, `/global-data` and all their subdirectories.

### API

#### getFilePaths

#### parseDataFiles

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.marcelkornblum.com"><img src="https://avatars1.githubusercontent.com/u/1162347?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marcel Kornblum</b></sub></a><br /><a href="https://github.com/signal-noise/datasupply/commits?author=marcelkornblum" title="Documentation">📖</a> <a href="#ideas-marcelkornblum" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://www.toffeemilkshake.co.uk"><img src="https://avatars3.githubusercontent.com/u/125399?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tom Pearson</b></sub></a><br /><a href="https://github.com/signal-noise/datasupply/commits?author=tomgp" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/chriscamplin"><img src="https://avatars.githubusercontent.com/u/342953?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chris Camplin</b></sub></a><br /><a href="https://github.com/signal-noise/datasupply/commits?author=chriscamplin" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
