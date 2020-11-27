# Unified Orchestrated Resource Management

> Uniform is an opinionated data processing, provision and presentation library of components for Javascript

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Why use Uniform

The uniform toolset allows you to create a front end Javascript application for data visualisation and manipulation quickly and easily. Using uniform will make it easier to spend time on the presentation of your data, by making predictable decisions in order to get your data from files to components.

If you use uniform on many projects your display components will have more predictable, consistent interfaces, and will therefore be more reusable.

## What Uniform is

Uniform is a set of opinionated libraries and configurations that save time for front end Javascript applications that deal with presenting data sets. 

It is extensible and flexible, and should be usable with any modern browser-based Javascript project regardless of framework, with any file format and with any display component or library.

Uniform is usable with no knowledge of how it works, but it's also easy to reason about, investigate and extend should you need to.

## What Uniform is not

Uniform is not an ORM or a database. It's not magic, and it's not a great leap forward. It does not do anything you can't do yourself using popular libraries. It just handles the boring stuff predictably so you don't have to.

Uniform is not licenced, closed or restricted. Use it as much as you like on anything you like. If you do something useful with it, please consider opening a PR back into the librbary so others can benefit.

## What Uniform does

Uniform consumes data from static file sources such as JSON and CSV files and allows you to predictably use that data in display components with a minimum of boilerplate. By using clear conventions and pragmatic defaults, uniform cuts out a lot of the boiletplate connecting data sources to stores and then via filtering and related functionality to display components.

Uniform looks for a configuration file, and falls back to pragmatic defaults for any options that aren't configured. All the important decisions it takes can be overridden with configuration. All the important format- or framework-specific code it uses is pluggable and can be swapped out.

When Uniform runs, it:
  * looks for data files in the project directory and converts them to its internal store using a sensible and performant representation
  * creates filters that can be easily combined and extended to retrieve slices of data
  * creates components and functions that can be used to connect the data (filtered or not) to the component of your choice
  * uses headings in the data file as column / parameter names for predictable data retrieval

## What Uniform does not do

Uniform does not make data relational, or know about relational data. It doesn't store data persistently. It doesn't make or receive network requests. It doesn't do any "magical" things that are hard to understand.

### What Uniform may come to do

Please see the roadmap.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.marcelkornblum.com"><img src="https://avatars1.githubusercontent.com/u/1162347?v=4" width="100px;" alt=""/><br /><sub><b>Marcel Kornblum</b></sub></a><br /><a href="https://github.com/signal-noise/uniform/commits?author=marcelkornblum" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
