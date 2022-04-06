# Intentions Game 🧠

## Getting Started

### JavaScript task

Before developing or previewing the game, ensure that the Node.js version 14+ is installed on your system. Download Node.js [here](https://nodejs.org/en/) and install Yarn using this command `npm i -g yarn`. After installing Yarn, run `yarn` in the root directory of this repository. After a short period of time, all dependencies for the tasks will be configured and ready for development.

### R API endpoint

To run the API endpoint for task computations, the following R packages should be installed:

- `doParallel`
- `dplyr`
- `logger`
- `jsonlite`
- `RestRserve`
- `matlab`
- `tidyverse`

To run the tests for the R API endpoint, ensure Python 3.6+ and the `pytest` are installed. The `pytest` package should be installed using the command `pip3 install -U pytest`. Additonally, the tests use the `requests` package which can be installed using the command `pip3 install requests`.

## Developer Commands 👨‍💻

`yarn clean`: Remove all build artefacts and logs.

`yarn build:game`: Create a production build of the game.

`yarn lint:game`: Check the JavaScript source code to check for any style violations.

`yarn start`: Start both the game and the API server.

`yarn start:server`: Launch the RPlumber API instance.

`yarn start:game`: Run a Webpack HMR-compatible development server to preview the game at [localhost:8080](http://localhost:8080).

`yarn test`: Run all tests, server and game tests.

`yarn test:server`: Run all the tests for the RPlumber API instance.

`yarn test:game`: Run all the tests for the game.
