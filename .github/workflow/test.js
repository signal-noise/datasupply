name: test

on: [push]

env:
  CI: true

jobs:
  test:
    name: Test on node ${{ matrix.node-version }} and ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        node-version: [10, 12]
        os: [ubuntu-latest, macos-latest]

    steps:
      - uses: actions/checkout@v1

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install latest npm
        run: npm install --global npm@latest

      - name: npm install
        run: npm install

      - name: Linting
        run: npm run lint

      - name: Testing
        run: npm test
