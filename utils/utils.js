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

module.exports = { parseLinks };
