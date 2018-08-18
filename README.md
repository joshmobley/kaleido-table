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

## Usage

The `<Table />` component takes one prop `data` which expects an array of objects to render data to the table.

### Object Formatting

Below is the structure expected for the `<Table />` component. Stylistically, the `<Table />` component is not dependent on any particular type of data, but this particular instance of it has been built to receive the following.

You can see an example data set in `src/data.json`.

```json
[{
  "id": "zzzabc123",                // string
  "header": "BaconHatsForever",     // string
  "netStatus": true,                // boolean
  "logStatus": true,                // boolean
  "vpcPublic": true,                // boolean
  "vpcPrivate": true,               // boolean
  "sections": [{                    // [object]
    "name": "Node Information",     // string
    "data": [{                      // [object]
      "label": "releaseVersion",    // string
      "value": "1.2.3"              // string
    }]
  }]
}]
```

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

1. `yarn test`
2. use `q` to quit watching for changes

### Docker Users

If using docker, from the command line run:

1. `docker-compose exec app /bin/bash` to enter the container shell
2. `yarn test`
3. use `q` to quit watching for changes
3. use `exit` to leave the container shell





