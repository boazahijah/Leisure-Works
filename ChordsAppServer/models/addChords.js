var mongoose = require('mongoose');

// languageCategory Schema
var chordsMaster = mongoose.Schema({
	chordname:{
		type: String,
		required: true
	},
	imageData:{
		type: String,
		required: true
	}
});

var ChordsMaster = module.exports = mongoose.model('ChordsMaster', chordsMaster);



// Add Book
module.exports.addChords = function(chords, callback){
	ChordsMaster.create(chords, callback);
}

// Get Books
module.exports.getChordsByName = function(songchords,callback){
	//console.log(songchords);
	ChordsMaster.find({ chordname: { $in: songchords } }, callback);
}

module.exports.viewChordsMaster = function(callback, limit){
	ChordsMaster.find(callback);
}

module.exports.removeChord = function(chordname, callback){
	ChordsMaster.find({ 'chordname':chordname }).remove( callback );
}



