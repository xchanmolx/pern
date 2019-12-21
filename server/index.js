const path = require('path');
const express = require('express');

const http = require('http');

const bodyParser = require('body-parser');

var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000; 

const app = express();

const server = http.createServer(app); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/cities', require('./api/cities'));
app.use('./api/weather', require('./api/weather'));

server.listen(5000);
console.log('Server listening on port %s', server.address().port);

db.query('SELECT NOW()', (err, res) => {
  if (err.error)
    return console.log(err.error);
  console.log(`PostgreSQL connected: ${res[0].now}.`);
});

// app.listen(PORT, () => {
//     console.log('Server listening on port ${PORT}!');
// });

module.exports = app;

