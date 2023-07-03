require("dotenv").config();
const mysql = require("mysql");
const fs = require("fs");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "test", // tried to change to jiggyjams and then npm run migrate
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = fs.readFileSync(__dirname + "/init_db.sql").toString();
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `products` was successful!");

    console.log("Closing...");
  });

  con.end();
});

// If you need to make any changes to the init_db.sql file - then npm run migrate to activate
// It is much easier to change from there
// in the future for numbers e.g. quantity and price have inter then put the currency and metrics in the front end component
