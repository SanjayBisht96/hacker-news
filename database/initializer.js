import userQueries from "../models/user";

class MySQLInitializer {
  createDatabaseIfNotExists = async (DB, database) => {
    await DB.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    console.log("Database created");
    return;
  };

  createTablesIfNotExists = async (DB) => {
    await DB.query(userQueries.createUserTabelQuery);

    console.log("All tables created");
    return;
  };
}

export default MySQLInitializer;