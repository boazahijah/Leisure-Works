var mongoose = require('mongoose');

// languageCategory Schema
var songRequest = mongoose.Schema({
	songname:{
		type: String,
		required: true
	},
	moviename:{
		type: String,
		required: true
	},
	status:{
		type: String,
		required: true
	}
});

var SongRequest = module.exports = mongoose.model('SongRequest', songRequest);



module.exports.submitRequest = function(songreq, callback){
	SongRequest.create(songreq, callback);
}

// Get Books
/*module.exports.getChordsByName = function(songchords,callback){
	
	ChordsMaster.find({ chordname: { $in: songchords } }, callback);
}
*/
