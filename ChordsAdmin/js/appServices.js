var appService = angular.module("appService", []);

//var appurl = "http://localhost:3000";
var appurl = "http://107.170.119.10:5000";
/*appService.service('controllerIntermediate', ['$http', function($http) {
  var songLanguage = "";

  var setLanguage = function(lang) {
     songLanguage = lang;
  };

  var getLanguage = function(){
      return songLanguage;
  };

  return {
    setLanguage: setLanguage,
    getLanguage: getLanguage
  };

}]);
*/

appService.service('controllerIntermediate', ['$http', function ($http) {
  var languagename = "";
  var songName = "";
  var songkey = "";
  var pallaviDetails = {};
  var saranamDetails = {};
  var videoDetails = {};


  var setlanguagename = function (lang) {
    languagename = lang;
  };
  var getlanguagename = function () {
    return languagename;
  };

  var setsongName = function (song) {
    songName = song;
  };
  var getsongName = function () {
    return songName;
  };

  var setsongkey = function (song) {
    songkey = song;
  };
  var getsongkey = function () {
    return songkey;
  };

  var setpallaviDetails = function (pall) {
    pallaviDetails = pall;
  };

  var getpallaviDetails = function () {
    return pallaviDetails;
  };

  var setsaranamDetails = function (sar) {
    saranamDetails = sar;
  };

  var getsaranamDetails = function () {
    return saranamDetails;
  };

  var setvideoDetails = function (viddet) {
    videoDetails = viddet;
  };

  var getvideoDetails = function () {
    return videoDetails;
  };

  var tipDetails = {};

  var setTip = function (tip) {
    tipDetails = tip;
  };

  var getTip = function () {
    return tipDetails;
  };



  return {
    setpallaviDetails: setpallaviDetails,
    getpallaviDetails: getpallaviDetails,
    setsaranamDetails: setsaranamDetails,
    getsaranamDetails: getsaranamDetails,
    setvideoDetails: setvideoDetails,
    getvideoDetails: getvideoDetails,
    setlanguagename: setlanguagename,
    getlanguagename: getlanguagename,
    setsongName: setsongName,
    getsongName: getsongName,
    setsongkey: setsongkey,
    getsongkey: getsongkey,
    setTip: setTip,
    getTip: getTip
  };

}]);
/*
appService.service('controllerIntermediate', ['$http', function($http) {
  var songLanguage = "";
  var songDetails = {};
  var chordImageDetails = {};

  var setLanguage = function(lang) {
     songLanguage = lang;
  };

  var getLanguage = function(){
      return songLanguage;
  };

  var setSongDetails = function(songDet) {
     songDetails = songDet;
  };

  var getSongDetails = function(){
      return songDetails;
  };

  var setChordImageDetails = function(chordDet) {
     chordImageDetails = chordDet;
  };

  var getChordImageDetails = function(){
      return chordImageDetails;
  };

  return {
    setLanguage: setLanguage,
    getLanguage: getLanguage,
    setSongDetails : setSongDetails,
    getSongDetails : getSongDetails,
    setChordImageDetails : setChordImageDetails,
    getChordImageDetails : getChordImageDetails
  };

}]);*/

/*appService.service('controllerIntermediate', ['$http', function($http) {
  var songLanguage = "";
  var songDetails = {};


  var setLanguage = function(lang) {
     songLanguage = lang;
  };

  var getLanguage = function(){
      return songLanguage;
  };

  var setSongDetails = function(songDet) {
     songDetails = songDet;
  };

  var getSongDetails = function(){
      return songDetails;
  };

 

  return {
    setLanguage: setLanguage,
    getLanguage: getLanguage,
    setSongDetails : setSongDetails,
    getSongDetails : getSongDetails
  };

}]);*/

appService.service('addLanguageServ', ['$http', function ($http) {
  this.addLanguage = function (formData, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/addLanguage',
      data: { 'data': formData }
    }).then(callback);
  }
}]);

appService.service('addChordsServ', ['$http', function ($http) {
  this.addChords = function (formData, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/addChords',
      data: { 'data': formData }
    }).then(callback);
  }
}]);

appService.service('addSongsServ', ['$http', function ($http) {
  this.addSongs = function (formData, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/addSongs',
      data: { 'data': formData }
    }).then(callback);
  }
}]);

appService.service('viewLanguageServ', ['$http', function ($http) {
  this.viewLanguage = function (callback) {
    $http({
      method: 'GET',
      url: appurl + '/admin/languages'
    }).then(callback);
  }
}]);


appService.service('viewLanguageServ', ['$http', function ($http) {
  this.viewLanguage = function (callback) {
    $http({
      method: 'GET',
      url: appurl + '/admin/languages'
    }).then(callback);
  }
}]);

appService.service('viewChordsMaster', ['$http', function ($http) {
  this.viewChords = function (callback) {
    $http({
      method: 'GET',
      url: appurl + '/admin/chords'
    }).then(callback);
  }
}]);




appService.service('viewImageServ', ['$http', function ($http) {
  this.viewImage = function (callback) {
    $http({
      method: 'GET',
      url: appurl + '/admin/language/'
    }).then(callback);
  }
}]);

appService.service('viewSongsServ', ['$http', function ($http) {
  this.viewSongs = function (callback) {
    $http({
      method: 'GET',
      url: appurl + '/admin/songs'
    }).then(callback);
  }

  this.viewSongsByName = function (songName, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/songsByName',
      data: { 'data': songName }
    }).then(callback);
  }

}]);


appService.service('addSongDetailsServ', ['$http', function ($http) {
  this.addSongDetails = function (formData, notification, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/addSongDetails',
      data: {
        'data': formData,
        'notification': notification
      }
    }).then(callback);
  }

  this.addSongChordDetails = function (formData, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/addChordDetails',
      data: { 'data': formData }
    }).then(callback);
  }

  this.updateSongDetails = function (formData, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/updateSongDetails',
      data: { 'data': formData }
    }).then(callback);
  }

}]);

appService.service('viewSongDetailsServ', ['$http', function ($http) {



  this.loadLastUpdatedSongs = function (callback) {
    $http({
      method: 'GET',
      url: appurl + '/admin/lastUpdatedSongs'
    }).then(callback);
  }


  this.viewSongDetails = function (songName, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/songDetails',
      data: { 'data': songName }
    }).then(callback);
  }

  this.viewChordDetails = function (songName, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/chordDetails',
      data: { 'data': songName }
    }).then(callback);
  }

  this.viewChordImage = function (chords, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/chordImages',
      data: { 'data': chords }
    }).then(callback);
  }

  this.filterSongs = function (songName, songKey, languageName, callback) {

    $http({
      method: 'POST',
      url: appurl + '/admin/filterSongs',
      data: {
        'songname': songName,
        'songkey': songKey,
        'languagename': languageName
      }
    }).then(callback);
  }

  this.getTotalRecordCount = function (songName, songKey, languageName, callback) {

    $http({
      method: 'POST',
      url: appurl + '/admin/getTotalRecordCount',
      data: {
        'songname': songName,
        'songkey': songKey,
        'languagename': languageName
      }
    }).then(callback);

  }

  this.getSongsByPaginate = function (songName, songKey, languageName, pageno, callback) {
    // alert('');
    $http({
      method: 'POST',
      url: appurl + '/admin/getSongsPaginate',
      data: {
        'songname': songName,
        'songkey': songKey,
        'languagename': languageName,
        'pageno': pageno
      }
    }).then(callback);

  }
}]);


appService.service('pushNotifyService', ['$http', function ($http) {
  this.sendPush = function (formData, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/sendPushNotificationV2',
      data: { 'data': formData }
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