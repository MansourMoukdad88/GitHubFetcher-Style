var mysql = require("mysql");
if (process.env.NODE_ENV === 'production') {

var connection = mysql.createConnection({
  host: "sql7.freemysqlhosting.net",
  user: "sql7279609",
  password: "6gi2mD4wup",
  database: "sql7279609"
});
} else {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "educompassy"
  });
}
connection.connect(err => {
  if (err) {
    return err;
  }
});

//console.log("FROM database .... : ", connection)

var getRepos = function(name, callback) {
  console.log("Name ..... ", name);
  connection.query(
    `SELECT * FROM users JOIN repos ON users.user_id = repos.user_id WHERE users.name = "${name}"`,
    function(err, results, fields) {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        console.log("Query From database", results);
        callback(null, results);
      }
    }
  );
};

var save = data => {
  console.log("AAAAAAAAA", data.username);
  var insert_User_Query = `INSERT INTO users (name) VALUES('${data.username}')`;
  // var insert_Repos_Query = `INSERT INTO repos (username) VALUES('${data.name}')`;

  connection.query(insert_User_Query, (err, results) => {
    if (err) {
      console.log(err);
      //return res.send(err);
    } else {
      //console.log("successfully added usernames", results);
      //console.log("successfully added usernames", results.insertId);
      console.log("mmmmmmmm", results);
      //console.log("REPOOOOOOS", data.userRepo[0]["name"]);

      for (var i = 0; i < data.userRepo.length; i++) {
        var insert_Repos_Query = `INSERT INTO repos (repo_name, user_id) VALUES('${
          data.userRepo[i]["name"]
        }','${results.insertId}')`;
        connection.query(insert_Repos_Query, function(err, results) {
          if (err) {
            console.log(err);
          } else {
            console.log("Saved to DB....");
          }
        });
      }

      // return res.send(data);
    }
  });
};

module.exports.getRepos = getRepos;
module.exports.save = save;
