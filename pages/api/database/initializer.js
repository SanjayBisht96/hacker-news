const userQueries = require("../models/user");

exports.createDatabaseIfNotExists = async (DB, database) => {
  await DB.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  console.log("Database created");
  return;
};

exports.createTablesIfNotExists = async (DB) => {
  await DB.query(userQueries.createUserTabelQuery);
  
  console.log("All tables created");
  return;
};
