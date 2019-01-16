# PR Tracker
### About
PR Tracker uses Express to serve up a React app that sends requests to the GitHub API to retrieve and display all open pull requests on the given repository

## Heroku
The application is live [here](http://bottd-pr-tracker.herokuapp.com/) on Heroku.

### Installation and Setup

To set up the server locally follow these steps:

This project requires node to be installed.

`$ git clone https://github.com/bottd/pr-tracker && cd pr-tracker`
`$ npm install`
`$ npm run build-client`

### Running the server

The server can be run with

`npm start`

This will start the server on port 4000 by default, open your browser and go to http://localhost:4000 to view the application.

To run the test suite

`npm test`
