import mysql from "mysql2";

const pool = mysql.createPool({
  host: "35.228.18.247",
  user: "server",
  password: 'l@XuS-G~$a$Mp)"C',
  database: "finco-dev",
  // socketPath: process.env.CLOUD_SQL_CONNECTION_NAME,
  // Reduce load on Google Cloud MySQL server
  connectionLimit: 10,
  // Convert MySQL boolean values to JavaScript boolean values
  typeCast: (field, next) =>
    field.type == "TINY" && field.length == 1 ? field.string() == "1" : next(),
});

export default pool;
