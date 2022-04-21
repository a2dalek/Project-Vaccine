const mysql = require('mysql');

class DataBaseConnection {
  
  DBcon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vaccine"
  });
  
}

module.exports = new DataBaseConnection;