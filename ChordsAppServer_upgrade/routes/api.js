/*
// Dependencies
var express = require('express');
var router = express.Router();

// Models
var languageCategory = require('../models/product');

// Routes
languageCategory.methods(['get', 'put', 'post', 'delete']);
languageCategory.register(router, '/languageCategory');

// Return router
module.exports = router;
*/