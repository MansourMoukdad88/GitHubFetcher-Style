var express = require("express");
var bodyParser = require("body-parser");
var sqlData = require("../database/index.js");
const helpers = require("../helpers/github.js");
const port = process.env.PORT || 5000;

let app = express();
var cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(__dirname + "/../client/dist"));

app.post("/repos", function(req, res) {
  //console.log("Post request from server", req.body);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  //console.log("REQUEST.....", req.body);
  var username = req.body.username;
  sqlData.getRepos(username, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("GET REPOS.....results (in server)", results);
      if (results.length > 0) {
        res.send(results);
      } else {
        helpers.getReposByUsername(username, function(userRepo) {
          //console.log("userRepo", userRepo);
          sqlData.save({ username: username, userRepo: userRepo.repos });
        });
      }
    }
  });
});

app.get("/repos", function(req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  sqlData.getRepos(req.body.username, function(data) {
    console.log("......Data From DB.....", data);
    //res.json(data);
    res.send(data);
  });
});

//let port = 1128;
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
}
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
