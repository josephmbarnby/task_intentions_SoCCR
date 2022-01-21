# Intentions Game 🧠

## Getting Started

Before developing or previewing the game, ensure that the Node.js version 14+ is installed on your system. Download Node.js [here](https://nodejs.org/en/) and install Yarn using this command `npm i -g corepack`. After installing Yarn, run `yarn install` in the root directory of this repository. After a short period of time, all dependencies for the tasks will be configured and ready for development.

## Commands 👨‍💻

`yarn dev`: Run a Webpack development server to preview the task at [localhost:8080](http://localhost:8080).

`yarn watch`: Rebuild on changes. The other commands do this automatically anyway.

`yarn build`: Create a production build of the game, ready for deployment locally or online via Gorilla.

`yarn lint`: Pipe all the source code through ESLint to check for any style violations.

`yarn clean`: Remove build artefacts.

`yarn test`: Run all tests, currently testing interface rendering and accessibility.

## Tools 🛠

`yarn`: manage dependencies and packages

`Webpack`: module bundling tool and development server

[`grommet`](https://v2.grommet.io/): accessible UI framework for React used to build the interfaces

`gulp`: automation of everything that Webpack can't do

`ESLint`: enforces a consistent style
