const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const DB = require('./app/DB/DBconnect');

DB.DBcon.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const route = require('./routes/index');
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
