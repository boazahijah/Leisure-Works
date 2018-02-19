var mongoose = require('mongoose');

// languageCategory Schema
var chordDetails = mongoose.Schema({
	chordDetails:[{
    id : {
		type: String,
		required: true
	},
    chordname : {
		type: String,
		required: true
	}
     }],
	languagename:{
		type: String,
		required: true
	},
     songname:{
		type: String,
		required: true
	}
	
});

var ChordDetails = module.exports = mongoose.model('ChordDetails', chordDetails);

// Add Book
module.exports.addChordDetails = function(chordDetails, callback){
	ChordDetails.create(chordDetails, callback);
}

// Get Book
module.exports.getChordDetailsByName = function(songname, callback){
	ChordDetails.find({'songname' : songname}, callback);
}