import mysql from "mysql";
import MySQLInitializer from "./initializer";

const mySQLInitializer = new MySQLInitializer();

const options = {
  env: process.env.ENV,
  host: process.env.MYSQL_DB_HOST,
  port: process.env.MYSQL_DB_PORT,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
};

// create connection with DB
let DB = mysql.createConnection({
  host: options.host,
  user: options.user,
  password: options.password,
  database: options.database,
  port: options.port,
  ssl: true,
});

DB.connect(async (err) => {
  if (err) throw err;
  console.log("MySQL connected with the app!");

  await mySQLInitializer.createDatabaseIfNotExists(DB, options.database);
  await mySQLInitializer.createTablesIfNotExists(DB);
});

module.exports = DB;
