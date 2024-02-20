# Simple chat task overview

This application consists of a simple form that gets the user name, and the single chatting page, similar to a chat room.
User can send and recieve messages.

<b>Implementation duration:</b> about 3 hours


## Table of Contents
- [Installation](#installation)
- [Implementation](#implementation)
- [Available Scripts](#available-scripts)
  - [`npm start`](#npm-start)
  - [`npm test`](#npm-test)
  - [`npm run format`](#npm-run-format)

## Installation

To run this project, make sure you have Node.js and npm installed on your machine. You can download them from https://nodejs.org/.

At the time this project is compatible with node v20.5.1, and npm version 9.8.0>, so it is recommended to have the same versions installed to avoid further complications.

After having this requirements in place, you may run `npm install`, and then you can start te project by running `npm start`:

```console
npm install
npm start
```

Now you can open http://localhost:3000 to view it in the browser.


## Implementation

How this chat works is by calling the get messages api every 5 seconds (the duration can be changed in the application environment variables).

When the user sends a message, the newly sent messages and the newly recieved messages(from the updated timestamp) will be compared, and the repeated messages between the two will be removed, so that there is no gap or window, in which the user will miss the recieving messages, from the point the user sends messages until the messages are periodically updated, while there also will be no duplicated messages.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run format`

Runs Prettier through all files (except node_modules, build, and dist) to assure uniform syntax.

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary. By running this command, you will format the code so that it's all the way syntactically consistant.