// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var parentCategoryController = require('./routes/parentCategoryController');
var ringToneController = require('./routes/ringToneController');

// MongoDB
//mongoose.connect('mongodb://localhost:/chordsapp');
//mongoose.connect('mongodb://107.170.119.10:57015/chordsapp');
//mongoose.connect('mongodb://localhost:/RingToneApp');
mongoose.connect('mongodb://107.170.119.10:57015/cineringtone', function (err) {
    if (err) { console.log(err); } else {
        console.log("Connection Successfull");
    }

});


// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(require('connect').bodyParser());

// Routes
app.use('/Category', parentCategoryController);
app.use('/RingTone', ringToneController);


// Start server
app.listen(4000);
console.log('API is running on port 4000');
