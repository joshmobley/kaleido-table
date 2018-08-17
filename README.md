## Installation

### With Docker

This project ships w/ docker configuration. If you're running docker locally, follow these steps:

1. Clone this repo
2. Navigate to the root of the project
3. Ensure that port 3000 is available
4. Run `docker-compose up -d` from the terminal
5. Navigate in your browser to `http://localhost:3000`

### Without Docker

If you don't have Docker, no problem. You'll just need to follow these steps:

_Note: You can replace the below yarn commands with npm if you like_

1. Clone this repo
2. Navigate ot the root of the project
3. Run `yarn` -- if you don't have yarn, [follow these docs](https://yarnpkg.com/en/docs/install)
4. Once yarn finishes installing dependencies, run `yarn run start`
5. Webpack should open a browser for you to `http://localhost:3000` when the local server is running
