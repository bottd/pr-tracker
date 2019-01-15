const API = require('./API');

const token = process.env.TOKEN;
const { getPulls, getData } = API;

async function fetchAllPulls(owner, repo) {
  let allPulls = [];
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&access_token=${token}`;
  let pageOfPulls = await getPulls(url);
  let links = parseLinks(pageOfPulls.links);
  allPulls.push(...pageOfPulls.pulls);
  while (links.next) {
    pageOfPulls = await getPulls(links.next);
    links = parseLinks(pageOfPulls.links);
    allPulls.push(...pageOfPulls.pulls);
  }
  return allPulls;
}

function cleanPulls(pulls) {
  const newPulls = pulls.map(async pull => {
    const commits = await getData(pull.commits_url);
    const comments = await getData(pull.comments_url);
    return {
      author: pull.user.login,
      commit_count: commits.length,
      comment_count: comments.length,
      title: pull.title,
    };
  });
  return Promise.all(newPulls);
}

function parseLinks(str) {
  const split = str.split(' ');
  const links = {};
  for (let i = 1; i <= split.length; i += 2) {
    const rel = split[i];
    const key = rel.substr(5, rel.indexOf('"'));
    const href = split[i - 1].substr(1, split[i - 1].indexOf('>') - 1);
    links[key] = href;
  }
  return links;
}

module.exports = { cleanPulls, fetchAllPulls, parseLinks };
