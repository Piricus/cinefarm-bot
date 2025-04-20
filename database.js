const fs = require('fs');
const path = './data/filmes.json';

function loadFilmes() {
  if (!fs.existsSync(path)) return [];
  return JSON.parse(fs.readFileSync(path));
}

function saveFilmes(filmes) {
  fs.writeFileSync(path, JSON.stringify(filmes, null, 2));
}

module.exports = { loadFilmes, saveFilmes };
