const mySql = require('mysql2');
var con = mySql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "michal9dev"
});

con.connect(err => {
  console.log(err)
  if (err) throw err;
  console.log("Connected!");
});
module.exports = con;