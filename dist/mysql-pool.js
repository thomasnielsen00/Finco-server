"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
require("dotenv").config();
const pool = mysql2_1.default.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    //  socketPath: process.env.CLOUD_SQL_CONNECTION_NAME,
    // Reduce load on Clever Cloud MySQL server
    connectionLimit: 5,
    waitForConnections: true,
    // Convert MySQL boolean values to JavaScript boolean values
    typeCast: (field, next) => field.type == "TINY" && field.length == 1 ? field.string() == "1" : next(),
});
pool.getConnection((error, connection) => {
    if (error)
        console.log(error);
    console.log("Connected successfully");
});
exports.default = pool;
//# sourceMappingURL=mysql-pool.js.map