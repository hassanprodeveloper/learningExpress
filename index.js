// importing
const express = require("express");
const mysql = require("mysql");

// initilizing
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hassan",
});

// creating connection to database
connection.connect(function (error) {
  if (!!error) {
    console.log("their is an error while connecting to database", error);
  } else {
    console.log("database is connected");
  }
});

// 
app.get('/', function (req, res) {
    connection.query(
      "SELECT * FROM learningexpress",
      function (error, row, fields) {
        if (!!error) {
          console.log("error in connection.query", error);
        } else {
            console.log("successful query");
            res.send(row);
        }
      }
    );
})

app.listen(port);