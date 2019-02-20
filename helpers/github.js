const request = require("request");
const config = require("../config.js");
const sql = require("../database/index.js");

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      "User-Agent": "request",
      Authorization: `token ${config.TOKEN}`,
      Accept: "application/vnd.github.v3+json"
    }
  };

  request.get(options, function(err, res, body) {
    if (err) {
      console.log(err);
    }
    console.log("helper");
    var userRepo = { username: username, repos: JSON.parse(body) };
    callback(userRepo);
  });
};

module.exports.getReposByUsername = getReposByUsername;
