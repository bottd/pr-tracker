require('dotenv').config();
const express = require('express');
const path = require('path');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 4000;

app.get('/api/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;
  const data = await utils.fetchAllPulls(owner, repo);
  const cleaned = await utils.cleanPulls(data);
  res.status(200).json(cleaned);
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
