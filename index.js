// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

// App Setup
// middlewares
app.use(morgan('combined')); // logging framework for debugging
app.use(bodyParser.json({ type: '*/*' })); // parse incoming requests

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port', port);
