require('dotenv').config()
const express = require('express');
const path = require('path');
const API = require('./utils/API');

const app = express();
const port = process.env.PORT || 4000;

app.get('/api/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;
  const data = await API.fetchAllPulls('facebook', 'react');
  // get all open PRs for repo
  // request commits for each repo to get commit counts
  // send in response
  res.status(200).json({ owner, repo });
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
