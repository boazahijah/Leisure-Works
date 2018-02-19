// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var adminRouter = require('./routes/adminRouter');

// MongoDB
//mongoose.connect('mongodb://localhost:/chordsapp');
//mongoose.connect('mongodb://107.170.119.10:57015/chordsappdummy');
mongoose.connect('mongodb://boazahijah:boazAhijah01@107.170.119.10:57015/chordsapp');

//mongoose.connect('mongodb://127.0.0.1:27017/chordsapp');


// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/admin', adminRouter);

// Start server
app.listen(5000);
console.log('API is running on port 5000');