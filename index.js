var mysql = require('mysql');
const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
var msg = require('./notification.js');

app = express();

var pool = mysql.createPool({
  host: "your_localhost",
  user: "root",
  password: "your_password",
  database: "your_database"
});

var message = { 
  app_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx",
  headings: {"en": "Your Title"},
  contents: {"en": "Your Contents"},
  included_segments: ["Active Users"]
};

cron.schedule("* * * * *", function () {
  pool.getConnection(function (err) {
    if (err) throw err;
    var sql = "Your SQL";
    pool.query(sql, function (err, result) {
      if (err) throw err;
      else if (result != 0) {
        msg.sendNotification(message);
        console.log(result);
      }
      else if (result == 0) {
        console.log('Tidak ada data');
        console.log(result);
      }
    });
  });
});
