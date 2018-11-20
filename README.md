# Mini App - School Power 

Rest Api Node and Mysql

## Description
This is an Restful API for Node.js and Mysql. This is in the MVC format,
view part is designed by HTML.

For having access to pages just need to write **http://localhost:3000/pageName.html**

## Installation

run 
>npm install 

It will install all dependencies.

#### Database connection

Change values in config file:

/config/config.js
```
CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mysql';
CONFIG.db_host      = process.env.DB_HOST       || 'localhost';
CONFIG.db_port      = process.env.DB_PORT       || '3306';
CONFIG.db_name      = process.env.DB_NAME       || 'school_power';
CONFIG.db_user      = process.env.DB_USER       || 'root';
CONFIG.db_password  = process.env.DB_PASSWORD   || '<password>';

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';
```
## Run

First run MySQL server.

And run  

>npm start



