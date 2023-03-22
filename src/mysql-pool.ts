import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  // socketPath: process.env.CLOUD_SQL_CONNECTION_NAME,
  // Reduce load on Google Cloud MySQL server
  connectionLimit: 10,
  // Convert MySQL boolean values to JavaScript boolean values
  typeCast: (field, next) =>
    field.type == "TINY" && field.length == 1 ? field.string() == "1" : next(),
});

export default pool;
