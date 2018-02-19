var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

// languageCategory Schema
var addSongs = mongoose.Schema({
	languageName: {
		type: String,
		required: true
	},
	songName: {
		type: String,
		required: true
	},
	movieName: {
		type: String,
		required: true
	},
	songKey: {
		type: String,
		required: true
	}
	/*imageData:{	
		type: String,
		required: true
	}*/

});

addSongs.plugin(timestamps);

var AddSongs = module.exports = mongoose.model('AddSongs', addSongs);



// Add Book
module.exports.addSongsList = function (addSongs, callback) {
	AddSongs.create(addSongs, callback);
}

// Get Books
module.exports.getSongs = function (callback, limit) {
	AddSongs.find(callback).limit(limit);
}

// Get Book
module.exports.getSongsByLang = function (languageName, callback) {
	AddSongs.find({ 'languageName': languageName }, callback);
}

module.exports.removeSong = function (songName, callback) {
	AddSongs.find({ 'songName': songName }).remove(callback);
}


// Filter Songs
module.exports.getSongsByNameAndKey = function (songname, songkey, languagename, callback) {
	var query = {};
	var regex_songname;
	var regex_songkey;

	if (songkey != "") {
		regex_songkey = new RegExp(songkey, "i");
		query.songKey = regex_songkey;
	}
	query.languageName = languagename;
	if (songname != "") {
		regex_songname = new RegExp(songname, "i");
		query.songName = regex_songname;
	}
	//console.log(query);
	AddSongs.find(query, callback);
}

module.exports.getSongsByNameAndMovie = function (languagename, pageNo, searchInput, callback) {
	var query = {};
	/* var regex_songname;
    var regex_songkey; */
	var regex_searchinput;

	var limit = 10;
	var skip = (pageNo - 1) * limit;
	var sort = {
		'skip': skip, // Starting Row
		'limit': limit, // Ending Row
		'sort': {
			songName: 1 //Sort by Date Added DESC
		}
	}
	query.languageName = languagename;

	if (searchInput != "") {
		regex_searchinput = new RegExp(searchInput, "i");
		query.songName = regex_searchinput;
		// query.ringToneName = regex_searchinput;
	}
	//console.log(query);
	AddSongs.find(query, null, sort, callback).limit(limit);
}

module.exports.getSongsByName = function (songname, callback) {
	//console.log("songsname search : ");
	var query = {};
	var regex_songname;
	if (songname != "") {
		regex_songname = new RegExp(songname, "i");
		query.songName = regex_songname;
	}
	AddSongs.find(query, null, null, callback);
}

//Get Total Count
module.exports.getTotalRecordCount = function (songname, songkey, languagename, callback) {
	var query = {};
	var regex_songname;
	var regex_songkey;

	if (songkey != "") {
		regex_songkey = new RegExp(songkey, "i");
		query.songKey = regex_songkey;
	}
	query.languageName = languagename;
	if (songname != "") {
		regex_songname = new RegExp(songname, "i");
		query.songName = regex_songname;
	}
	//console.log(query);
	AddSongs.count(query, callback);
}

// Filter Songs
module.exports.getSongsByNameAndKeyPaginate = function (songname, songkey, languagename, pageNo, callback) {
	var query = {};
	var regex_songname;
	var regex_songkey;
	var limit = 10;
	var skip = (pageNo - 1) * limit;
	var sort = {
		'skip': skip, // Starting Row
		'limit': limit, // Ending Row
		'sort': {
			songName: 1 //Sort by Date Added DESC
		}
	}

	if (songkey != "") {
		regex_songkey = new RegExp(songkey, "i");
		query.songKey = regex_songkey;
	}
	query.languageName = languagename;
	if (songname != "") {
		regex_songname = new RegExp(songname, "i");
		query.songName = regex_songname;
	}
	//console.log(query);
	AddSongs.find(query, null, sort, callback);
}

module.exports.getSongsByNamePaginateV2 = function (songname,pageNo, callback) {
	//console.log("songsname search : ");
	var query = {};
	var regex_songname;
	var limit = 10;
	var skip = (pageNo - 1) * limit;
	var sort = {
		'skip': skip, // Starting Row
		'limit': limit, // Ending Row
		'sort': {
			songName: 1 //Sort by Date Added DESC
		}
	}
	var regex_songname;
	if (songname != "") {
		regex_songname = new RegExp(songname, "i");
		query.songName = regex_songname;
	}
	AddSongs.find(query, null, sort, callback);
}



module.exports.lastUpdatedSongs = function (callback) {

	//AddSongs.find({},null,sort,callback);
	AddSongs.find(callback).sort([['createdAt', -1]]).limit(10);
}


module.exports.filterSongsExtend = function (songname, movieName, languagename, callback) {
	var query = {};
	var regex_songname;
	var regex_movie;
	var regex_langname;
	if (languagename != "" && typeof languagename != "undefined") {
		query.languageName = languagename;
	}

	if (movieName != "" && typeof movieName != "undefined") {
		regex_movie = new RegExp(movieName, "i");
		query.movieName = regex_movie;
	}

	if (songname != "" && typeof songname != "undefined") {
		regex_songname = new RegExp(songname, "i");
		query.songName = regex_songname;
	}
	
	AddSongs.find(query, callback);
}

module.exports.getFavouriteSongs = function (songnames,callback) {
	AddSongs.find({ "songName": { "$in": songnames } }, callback);
}




