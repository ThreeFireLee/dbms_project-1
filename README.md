# DBMS_Proj
CS5200 Database Management Systems Project

## Structure
This website is built with AngularJS/Bootstrap as front-end, NodeJS as back-end. Of course, the database is MySQL.

All database queries locate in serverside services:
- /server/services
  - buyer.service.server.js
  - seller.service.server.js
  - user.service.server.js
  
Each database query is implemented as a transaction to guarantee integrity.
  
An overlook of all serverside APIs is at:
- /server/api.server.js

Each API entry maps to a handler defined in the three services.

Database initializing script is at:
- /server/db_init.sql

## Try it now
The project is hosted on AWS-EC2, which is accessible at
[http://54.70.113.60:3000](http://54.70.113.60:3000)
