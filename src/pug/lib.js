const path = require('path');
const fs = require('fs');
const config = require('./config.json');
const localizedStrings = require('./strings.json');

const dataDirectory = '../data';

let lang = 'en';

function str(id) {
  if (localizedStrings[id] !== undefined && localizedStrings[id][lang] !== undefined) {
    return localizedStrings[id][lang];
  }
  return id;
}

function setLang(code) {
  lang = code;
}

function getLang() {
  return lang;
}

function pageTitle(title) {
  if (title === undefined) {
    return config.siteName;
  }
  return `${title} - ${config.siteName}`;
}

function applications(language) {
  const answer = [];
  const dataFilePath = path.join(dataDirectory, `${language}.json`);
  const translation = JSON.parse(fs.readFileSync(dataFilePath));
  Object.entries(translation.texts)
    .forEach(([id, item]) => {
      if (id.substr(0, 1) !== '@') {
        answer.push(Object.assign({}, { id }, item));
      }
    });
  return answer;
}

module.exports = {
  str,
  setLang,
  getLang,
  pageTitle,
  config,
  applications,
};
