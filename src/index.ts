import express, { Request, Response } from "express";
import companyRouter from "./company-router";
import userRouter from "./user-router";


// import path from 'path';
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// Serve client files
// app.use(express.static(path.join(__dirname, '/../../client/public')));

app.use("/api", companyRouter, userRouter);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

export default app;
