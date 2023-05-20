# Server for Finco's investement application

## Project description

This server has been developed as a part of our bachelor thesis in Digital Business Development at NTNU.
The server offers a varaity of API-endpoints and i connected to our database. For more information about the
functionality, please check out our client side.

## Setup database connections

### Create your own database

You need to create one .env file that will contain the database connection details to your
database. This file should not be uploaded to your git repository, and have therefore been
added to `.gitignore`. We have used Clever Cloud as our provider. Please set up your database to match the ER-diagram given in our thesis, and provide the following environment variables in a .env file in the root file:

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

Please contact one of the contributors if you have any questions.
