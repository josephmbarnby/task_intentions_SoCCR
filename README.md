# Intentions Game 🧠

## Getting Started

Before developing or previewing the game, ensure that the Node.js version 14+ is installed on your system. You can download Node.js [here](https://nodejs.org/en/). After installing Node.js, run `yarn install` in the root directory of this repository. After a short period of time, all dependencies for the tasks will be configured and ready for development.

## Commands 👨‍💻

`yarn dev`: Run a webpack HMR-compatible (hot module reload) development server to preview the task at [localhost:8080](http://localhost:8080).

`yarn watch`: Rebuild on changes. The other commands do this automatically anyway.

`yarn build`: Create a production build of the game. Ensure the target field of `config.js` is updated to reflect the target of the build.

`yarn style`: Pipe all the source code through ESLint to check for any style violations.

`yarn clean`: Remove any build artefacts.

## Tools 🛠

`yarn`: manage dependencies and packages

`webpack`: module bundling tool and development server

[`grommet`](https://v2.grommet.io/): accessible React front-end framework used to build the interfaces

`gulp`: automation of everything that webpack can't do

`ESLint`: enforces a consistent style
