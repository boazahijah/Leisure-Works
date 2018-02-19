var mongoose = require('mongoose');

// languageCategory Schema
var languageCategory = mongoose.Schema({
	languagename:{
		type: String,
		required: true
	},
	imageData:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	}
	
});

var Language = module.exports = mongoose.model('Language', languageCategory);



// Add Book
module.exports.addLanguage = function(language, callback){
	Language.create(language, callback);
}

// Get Books
module.exports.getLanguage = function(callback, limit){
	Language.find(callback).limit(limit);
}

