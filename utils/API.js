const fetch = require('node-fetch');
const utils = require('./utils');
const token = process.env.TOKEN;

async function fetchAllPulls(owner, repo) {
  const pulls = [];
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&access_token=${token}`;
  let data = await fetchPulls(url);
  pulls.push(...data.pulls);
  while (data.links.next) {
    data = await fetchPulls(data.links.next);
    pulls.push(...data.pulls);
  }
  return pulls;
}

async function fetchPulls(url) {
  const response = await fetch(url);
  const data = await response.json();
  const pulls = await cleanPulls(data);
  let links = utils.parseLinks(response.headers.get('link'));
  return { links, pulls };
}

function cleanPulls(pulls) {
  const newPulls = pulls.map(async pull => {
    const commits = await getData(pull.commits_url);
    const comments = await getData(pull.comments_url);
    return {
      author: pull.user.login,
      commit_count: commits.length || 0,
      comment_count: comments.length || 0,
      title: pull.title,
    };
  });
  return Promise.all(newPulls);
}

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

module.exports = { cleanPulls, fetchPulls, fetchAllPulls, getData };
