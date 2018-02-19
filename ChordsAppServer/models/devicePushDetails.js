var mongoose = require('mongoose');

// languageCategory Schema
var deviceDetails = mongoose.Schema({
	device_token:{
		type: String,
		required: true
	},
     device_id:{
		type: String,
		required: true
	}
});

var DeviceDetails = module.exports = mongoose.model('DeviceDetails', deviceDetails);

// Register token
module.exports.registerToken = function(deviceDetails, callback){
	DeviceDetails.create(deviceDetails, callback);
}


module.exports.updateToken = function(deviceid, deviceDetails,options, callback){
	var query = {device_id: deviceid};
	
	DeviceDetails.update(query, deviceDetails, options, callback);
}

module.exports.getDeviceToken = function(deviceid, callback){
	DeviceDetails.find({'device_id' : deviceid}, callback);
}

module.exports.getRegisterTokens = function(callback){
	DeviceDetails.find(callback);
}


/*module.exports.getSongDetailsByName = function(songname, callback){
	SongDetails.find({'songname' : songname}, callback);
}

module.exports.getSongDetailsById = function(id, callback){
	SongDetails.find({'_id':id}, callback);	
}


module.exports.updateSongDetails = function(id, songdetails,options, callback){
	var query = {songname: id};
	
	SongDetails.update(query, songdetails, options, callback);
}*/