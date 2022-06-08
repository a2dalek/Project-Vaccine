const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
  origin: ['http://localhost:3000', 'https://dry-lake-49761.herokuapp.com'],
  credentials: true
}));
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
