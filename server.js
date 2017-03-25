const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use('/', express.static(__dirname + '/public'));
app.use('/lib', express.static(__dirname + '/node_modules'));

let mysql = require('mysql');
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbms_project'
});

require("./server/app-server.js")(app, db);

let port = 3000;
app.listen(port);

console.log('server started, listening port', port);
