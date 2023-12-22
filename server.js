// const http = require('http');

var express = require('express');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(_dirname, "index.html"));
});

app.get('/', function (req, res) {
    var response = res;

    MongoClient.connect('mongodb://admin:password@localhost:27017', function(err, client) {
      if (err) throw err;

      var db = client.db('user-account');
      var query = {userid:1};
      db.collection('user').findOne(query, function (err, result) {
          if (err) throw err;
          client.close();
          response.send(result);
      });
    });
});

app.post('/', function(req, res) {
    var userObj = req.body;
    var response = res;

    consol.log('Connecting to the db...');

    MongoClient.connect('mongodb://admin:password@localhost:27017', function(err, client) {
      if (err) throw err;

      var db = client.db('user-account');
      userObj['userid'] = 1
      var query =  {userid: 1};
      var newValues = { $set: userObj };
      
      consol.log('Successfully Connected to the user-account db...');

      db.collection('user').updateOne(query, newValues, {upsert: true}, function (err, res) {
          if (err) throw err;
          console.log('Successfully Updated or inserted');
          client.close();
          response.send(userObj);
      });

    });

});
// Create an HTTP server
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello, World!\n');
// });

// Define the port to listen on
const port = 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});