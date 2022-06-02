const express = require('express')
const cors = require('cors')

const app = express()
const port = 5000

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
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
