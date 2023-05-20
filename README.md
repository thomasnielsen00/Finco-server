# Server for Finco's Investment Application

## Project Description

This server has been developed as a part of our bachelor thesis in Digital Business Development at NTNU.
The server offers a variety of API endpoints and is connected to our database. For more information about the
functionality, please check out our client-side. Note that this server is hosted by Vercel. 

## Setup Database Connections

### Create Your Own Database Connection

You need to create an .env file that contains the database connection details to your
database. This file should not be uploaded to your git repository and has therefore been
added to `.gitignore`. We have used Clever Cloud as our provider. Please set up your database to match the ER-diagram given in our thesis and provide the following environment variables in a .env file in the root folder:

`/.env`:

```ts
MYSQL_HOST = "Host-url";
MYSQL_USER = "Username";
MYSQL_PASSWORD = "Password";
MYSQL_DATABASE = "Name of your database";
CLOUD_SQL_CONNECTION_NAME = "Connection name";
PORT = "Port";
```

These environment variables will be used in the `/src/mysql-pool.ts` file.

## Start server

Install dependencies and start server:

```sh
cd server
npm install
npm start
```

Please contact one of the contributors if you have any questions. You can reach us at [thomaeni@stud.ntnu.no], [bknielse@stud.ntnu.no] or [paaldv@stud.ntnu.no]. 
