const mysql = require('mysql');

class DataBaseConnection {
  
  DBcon = mysql.createConnection({
    host: "sql6.freemysqlhosting.net",
    user: "sql6497958",
    password: "gWW8isxFdy",
    database: "sql6497958"
  });
  
}

module.exports = new DataBaseConnection;