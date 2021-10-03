// importing
const express = require("express");
const mysql = require("mysql");

// initilizing
const app = express();
const port = 3000;
// simple connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hassan",
});

// pool connection
const poolConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "hassan",
  connectionLimit: 10,
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
app.get("/", function (req, res) {
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
});
// pool get request
app.get("/pool", function (req, res) {
  // creating pool connection to database
  poolConnection.getConnection(function (error, tempConect) {
    if (!!error) {
      console.log("error in pool connection", error);
    } else {
      console.log("pool connection successful !");
      tempConect.query(
        "SELECT * FROM learningexpress",
        function (error, row, fields) {
          if (!!error) {
            console.log("error in tempConect query", error);
          } else {
            console.log("successful query");
            res.json(row);
          }
        }
      );
    }
  });
});

// // post
// app.post('/', function (req, res) {
//     connection.query(
//       "SELECT * FROM learningexpress",
//       function (error, row, fields) {
//         if (!!error) {
//           console.log("error in connection.query", error);
//         } else {
//             console.log("successful query");
//             res.send(fields);
//         }
//       }
//     );
// })

app.listen(port);
