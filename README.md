# Intentions Game 🧠

## Getting Started

### JavaScript task

Before developing or previewing the game, ensure that the Node.js version 14+ is installed on your system. Download Node.js [here](https://nodejs.org/en/) and install Yarn using this command `npm i -g yarn`. After installing Yarn, run `yarn install` in the root directory of this repository. After a short period of time, all dependencies for the tasks will be configured and ready for development.

### R API endpoint

To run the API endpoint for task computations, the following R packages should be installed:

- `plumber`
- `jsonlite`
- `logger`
- `doParallel`
- `dplyr`
- `future`

To run the tests for the R API endpoint, ensure Python 3.6+ and the `pytest` are installed. The `pytest` package should be installed using the command `pip3 install -U pytest`. Additonally, the tests use the `requests` package which can be installed using the command `pip3 install requests`.

## Commands 👨‍💻

`yarn clean`: Remove all build artefacts and logs.

`yarn build:task`: Create a production build of the game.

`yarn lint:task`: Pipe all the game source code through ESLint to check for any style violations.

`yarn start`: Start both the task and the API server.

`yarn start:server`: Launch the RPlumber API instance.

`yarn start:task`: Run a Webpack HMR-compatible development server to preview the task at [localhost:8080](http://localhost:8080).

`yarn test`: Run all tests, server and task tests.

`yarn test:server`: Run all the tests for the RPlumber API instance.

`yarn test:task`: Run all the tests for the game.

## Tools 🛠

`Yarn`: manage dependencies and packages

`Webpack`: module bundling tool and development server

[`Grommet`](https://v2.grommet.io/): accessible React front-end framework used to build the interfaces.

`Jest`: testing framework for JavaScript. Multiple plugins used to evaluate accessiblity and display of React components.

`RPlumber`: configure an API endpoint that executes an R function when a request is received.

`Pytest`: testing framework for Python.
