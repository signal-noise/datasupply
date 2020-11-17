# How to contribute

We're really happy to see you here, since it means you're using uniform and want to improve it - just like us! While we've been thinking about this library for a long time, we have definitely not considered everything, and we also haven't had time to build out everything we've considered, so help is always appreciated!

As this is early days for the project there's not a lot in the way of
resources, but please check out the [documentation](./index.md) including the
[roadmap](./roadmap.md), and also the
[list of issues](https://github.com/signal-noise/uniform/issues).

[Signal Noise](https://signalnoise.io) use uniform on lots of our studio work and so we have strong thoughts about what may or may not work as part of the library, but we encourage you to make suggestions, ask questions and generally help us make this suitable for as wide a range of use cases as possible.

For now, please submit an issue if you need help with anything. If this takes off we'll
put more resources in place for support.

We have a [code of conduct](./CODE_OF_CONDUCT.md) so please make sure you follow
it.

## Testing

We haven't yet put anything in place for testing - not even a harness. If you'd like to help with
this please submit a PR!

## Submitting changes

Please send a
[GitHub Pull Request to uniform](https://github.com/signal-noise/uniform/pull/new/main)
with a clear list of what you've done (read more about
[pull requests](http://help.github.com/pull-requests/)). When you send a pull
request, please make sure you've covered off all the points in the template.

Please use [Prettier](https://prettier.io/docs/en/index.html) with no overrides, and make sure
you've read about our workflow (below); in essence make sure each Pull Request
is atomic but don't worry too much about the commits themselves as we use
squash-and-merge.

## Our workflow

We use [GitHub flow](https://guides.github.com/introduction/flow/); it's a lot
like git-flow but simpler and more forgiving. Some additional pieces we've put
in place are:

- We use the `squash and merge` strategy to merge Pull Requests.
- QA is built from branches starting with `release`, e.g. `release/v0.1`. Only
  hotfixes should be committed to those branches.
- Production is built from tags starting with a `v`, e.g. `v0.1`. The tags
  should be created from a release branch

In effect this means:

- Don't worry about individual commits. They will be preserved, but not on the
  main `main` branch history, so feel free to commit early and often, using
  git as a save mechanism.
- Your Pull Request title and description become very important; they are the
  history of the main branch and explain all the changes.
- You ought to be able to find any previous version easily using GitHub tabs, or
  [Releases](https://github.com/signal-noise/uniform/releases)

Thanks!
