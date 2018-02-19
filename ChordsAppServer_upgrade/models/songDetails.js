var mongoose = require('mongoose');

// languageCategory Schema
var songDetails = mongoose.Schema({
	pallaviDetails:[{
    id : {
		type: String,
		required: true
	},
    pallavilyric : {
		type: String,
		required: true
	}
     }],
	saranamDetails:[{
    id : {
		type: String,
		required: true
	},
    saranamlyric : {
		type: String,
		required: true
	}
     }],
   songTips:[{
    id : {
		type: String,
		required: true
	},
    tip : {
		type: String,
		required: true
	}
     }],
     videodetails:[{
    id : {
		type: String,
		required: true
	},
    videoid : {
		type: String,
		required: true
	},
	videourl : {
		type: String,
		required: true
	},
	videotitle : {
		type: String,
		required: true
	},
	videoduration : {
		type: String,
		required: true
	},
	videoviews : {
		type: String,
		required: true
	},
	videolikes : {
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
	},
     songkey:{
		type: String,
		required: true
	}
	
});

var SongDetails = module.exports = mongoose.model('SongDetails', songDetails);

// Add Book
module.exports.addSongDetails = function(songDetails, callback){
	SongDetails.create(songDetails, callback);
}

// Get Book
module.exports.getSongDetailsByName = function(songname, callback){
	SongDetails.find({'songname' : songname}, callback);
}

module.exports.getSongDetailsById = function(id, callback){
	SongDetails.find({'_id':id}, callback);	
}


module.exports.updateSongDetails = function(id, songdetails,options, callback){
	var query = {songname: id};
	
	SongDetails.update(query, songdetails, options, callback);
}