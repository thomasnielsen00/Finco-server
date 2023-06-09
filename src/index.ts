import express, { Request, Response } from "express";
import companyRouter from "./company-router";
import userRouter from "./user-router";
const cors = require("cors");

// import path from 'path';
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
// app.use(
//   cors({
//     origin: "https://finco-client.vercel.app",
//   })
// );
app.use(cors());
app.use(express.json());

app.use("/api", companyRouter, userRouter);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

export default app;

//test
