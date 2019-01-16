const fetch = require('node-fetch');
const utils = require('./');
const token = process.env.TOKEN;

async function getPulls(url) {
  const response = await fetch(url);
  const pulls = await response.json();
  const links = response.headers.get('link');
  return { links, pulls };
}

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

module.exports = { getData, getPulls };
