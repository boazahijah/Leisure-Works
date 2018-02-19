var appService = angular.module("appService", []);
var appurl = "http://localhost:3000";


appService.service('addLanguageServ', ['$http', function($http) {
 this.addLanguage = function(formData,callback){
  $http({
  	method: 'POST',
 	  url: appurl+'/admin/addLanguage',
     data: { 'data' : formData }
	}).then(callback);
}
}]);

appService.service('addChordsServ', ['$http', function($http) {
 this.addChords = function(formData,callback){
  $http({
    method: 'POST',
    url: appurl+'/admin/addChords',
     data: { 'data' : formData }
  }).then(callback);
}
}]);

appService.service('addSongsServ', ['$http', function($http) {
 this.addSongs = function(formData,callback){
  $http({
    method: 'POST',
    url: appurl+'/admin/addSongs',
     data: { 'data' : formData }
  }).then(callback);
}
}]);

appService.service('viewLanguageServ', ['$http', function($http) {
 this.viewLanguage = function(callback){
  $http({
    method: 'GET',
    url: appurl+'/admin/languages'
  }).then(callback);
}
}]);



appService.service('viewImageServ', ['$http', function($http) {
 this.viewImage = function(callback){
  $http({
    method: 'GET',
    url: appurl+'/admin/language/'
  }).then(callback);
}
}]);

appService.service('viewSongsServ', ['$http', function($http) {
 this.viewSongs = function(callback){
  $http({
    method: 'GET',
    url: appurl+'/admin/songs'
  }).then(callback);
}

this.viewSongsByName = function(songName,callback){
  $http({
    method: 'POST',
    url: appurl+'/admin/songsByName',
    data: { 'data' : songName }
  }).then(callback);
}

}]);


appService.service('addSongDetailsServ', ['$http', function($http) {
 this.addSongDetails = function(formData,callback){
  $http({
    method: 'POST',
    url: appurl+'/admin/addSongDetails',
     data: { 'data' : formData }
  }).then(callback);
}

this.addSongChordDetails = function(formData,callback){
  $http({
    method: 'POST',
    url: appurl+'/admin/addChordDetails',
     data: { 'data' : formData }
  }).then(callback);
}

this.updateSongDetails = function(formData,callback){
  $http({
    method: 'POST',
    url: appurl+'/admin/updateSong  Details',
     data: { 'data' : formData }
  }).then(callback);
}

}]);

appService.service('viewSongDetailsServ', ['$http', function($http) {
 this.viewSongDetails = function(songName, callback){
  $http({
    method: 'POST',
    url: appurl+'/admin/songDetails',
    data: { 'data' : songName }
  }).then(callback);
}

this.editSongDetails = function(id, callback){
  $http({
    method: 'POST',
    url: appurl+'/admin/editSongDetails',
    data: { 'data' : id }
  }).then(callback);
}
}]);





/*appService.factory('addLanguageServ', ['$window', function(win) {
   var msgs = [];
   return function(msg) {
     msgs.push(msg);
     if (msgs.length == 3) {
       win.alert(msgs.join("\n"));
       msgs = [];
     }
   };
 }]);*/

 appService.service('controllerIntermediate', ['$http', function($http) {
  var languagename="";
  var songName = "";
  var songkey="";
  var pallaviDetails = {};
  var saranamDetails = {};
  var videoDetails = {};
  

  var setlanguagename = function(lang) {
     languagename = lang;
  };  
  var getlanguagename = function(){
      return languagename;
  };

  var setsongName = function(song) {
     songName = song;
  };  
  var getsongName = function(){
      return songName;
  };

   var setsongkey = function(song) {
     songkey = song;
  };  
  var getsongkey = function(){
      return songkey;
  };

  var setpallaviDetails = function(pall) {
     pallaviDetails = pall;
  };

  var getpallaviDetails = function(){
      return pallaviDetails;
  };

  var setsaranamDetails = function(sar) {
     saranamDetails = sar;
  };

  var getsaranamDetails = function(){
      return saranamDetails;
  };

  var setvideoDetails = function(viddet) {
     videoDetails = viddet;
  };

  var getvideoDetails = function(){
      return videoDetails;
  };

  

  return {
    setpallaviDetails: setpallaviDetails,
    getpallaviDetails: getpallaviDetails,
    setsaranamDetails : setsaranamDetails,
    getsaranamDetails : getsaranamDetails,
    setvideoDetails : setvideoDetails,
    getvideoDetails : getvideoDetails,
    setlanguagename : setlanguagename,
    getlanguagename : getlanguagename,
    setsongName : setsongName,
    getsongName : getsongName,
    setsongkey : setsongkey,
    getsongkey : getsongkey
  };

}]);