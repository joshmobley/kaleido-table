## Installation

### With Docker

This project requires docker. If you have docker installed, follow these steps:

1. Clone this repo
2. Navigate to the root of the project
3. Ensure that port 3000, 4000, and 5000 are available
4. Run `docker-compose up -d mongodb-primary mongodb-secondary mongodb-arbiter` from the terminal
5. Once our mongo instances have had time to spin themselves up, run `docker-compose up -d client controller server`.
6. Once everything is running, navigate to the following ports: 
  - `http://localhost:3000` for the table app
  - `http://localhost:4000` for a separate controller to make DB manipulation easy

## Finding Your Way Around

The project is split into the following folders:

1. `client` - the original react app that renders our table
2. `controller` - a separate react app that gives us an easy way to add/edit/delete from the db
3. `server` - our node app

### Server

Our node server is a pretty basic setup, and all node code is found in `server.js`.

## Usage

The `<Table />` component takes one prop `data` which expects an array of objects to render data to the table.

### Object Formatting

Below is the structure expected for the `<Table />` component. Stylistically, the `<Table />` component is not dependent on any particular type of data.

### Styles

This component has been developed with decoupled styles. Meaning, the styles applied to this table could be reused on other components that take the same general shape. All table component styles, including the styles for the rows, shelves, and sections live inside of `src/styles/components/_table.scss`.

#### Other Stylistic Components

It should be noted that during development of the table styles, there were other pieces of UI that were determined to be modular and outside of the context of the table itself. These components included:

- Icons
  - This particular exercise required a modifier of `--environment`. An example can be seen on each table row.
- Status Lights: 
  - These denote whether an environment is active or not, and can bee seen on each table row.

#### Utility Styles

Some pieces of styling were determined to be highly specific to this instance of the table component. As such, those pieces were not styled within the component itself, but called on some utility classes for unique positioning and sizing requirements. These styles can be found in `src/styles/utilities/`.

## Testing

These components do come with tests. To run the suite:

1. `docker-compose exec client /bin/bash` to enter the container shell
2. `yarn test`
3. use `a` to run all tests
4. use `q` to quit watching for changes
5. use `exit` to leave the container shell





