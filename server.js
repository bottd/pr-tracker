const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

app.get('/api/:user/:repo', (req, res) => {
  const { user, repo } = req.params;
  // get all open PRs for repo
  // request commits for each repo to get commit counts
  // send in response
  res.status(200).json({ user, repo });
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
