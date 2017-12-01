// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
//
// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');
// App Setup
// middlewares
app.use(morgan('combined')); // logging framework for debugging
app.use(cors());
app.use(bodyParser.json({ type: '*/*' })); // parse incoming requests
router(app);
//
// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port', port);
