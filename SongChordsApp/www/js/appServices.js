var appService = angular.module("appService", []);

var appurl = "http://107.170.119.10:3000";
//var appurl = "http://localhost:3000";
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
  var songLanguage = "";
  var songDetails = {};
  var chordImageDetails = {};

  var setLanguage = function (lang) {
    songLanguage = lang;
  };

  var getLanguage = function () {
    return songLanguage;
  };

  var setSongDetails = function (songDet) {
    songDetails = songDet;
  };

  var getSongDetails = function () {
    return songDetails;
  };

  var setChordImageDetails = function (chordDet) {
    chordImageDetails = chordDet;
  };

  var getChordImageDetails = function () {
    return chordImageDetails;
  };

  return {
    setLanguage: setLanguage,
    getLanguage: getLanguage,
    setSongDetails: setSongDetails,
    getSongDetails: getSongDetails,
    setChordImageDetails: setChordImageDetails,
    getChordImageDetails: getChordImageDetails
  };

}]);

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

appService.service('addChordsServ', ['$http', function ($http) {
  this.addChords = function (formData, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/addChords',
      data: { 'data': formData }
    }).then(callback);
  }
}]);


appService.service('addLanguageServ', ['$http', function ($http) {
  this.addLanguage = function (formData, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/addLanguage',
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
  this.addSongDetails = function (formData, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/addSongDetails',
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

  this.filterSongsByName = function (songName, callback) {

    $http({
      method: 'POST',
      url: appurl + '/admin/filterSongsBySongName',
      data: {
        'songname': songName
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


appService.service('addSongDetailsServ', ['$http', function ($http) {
  this.addSongDetails = function (formData, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/addSongDetails',
      data: { 'data': formData }
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
      url: appurl + '/admin/updateSong  Details',
      data: { 'data': formData }
    }).then(callback);
  }

}]);


appService.service('submitRequest', ['$http', function ($http) {
  this.submitSongRequest = function (formData, callback) {
    $http({
      method: 'POST',
      url: appurl + '/admin/submitSongRequest',
      data: { 'data': formData }
    }).then(callback);
  }
}]);

appService.service('AdmobService', function ($timeout) {

  var _bannerId;
  var _interstitialId;
  /*
      var _isAdmobMissing = function() {
          if(window.plugins === undefined || window.plugins.AdMob === undefined) {
              return true;
          }
          return false;
      };
  */
  this.init = function (bannerId, interstitialId) {
    _bannerId = bannerId;
    _interstitialId = interstitialId;

    window.plugins.AdMob.setOptions({
      publisherId: bannerId,
      interstitialAdId: interstitialId,
      bannerAtTop: false, // set to true, to put banner at top
      overlap: false, // set to true, to allow banner overlap webview
      offsetTopBar: false, // set to true to avoid ios7 status bar overlap
      isTesting: false, // receiving test ad
      autoShow: true // auto show interstitial ad when loaded
    });
    registerAdEvents();
  };

  function registerAdEvents() {
    document.addEventListener('onReceiveAd', function () {
      console.log('onReceiveAd')
    });
    document.addEventListener('onFailedToReceiveAd', function (data) {
      console.log('onFailedToReceiveAd')
      console.log(data)
    });
    document.addEventListener('onPresentAd', function () {
      console.log('onPresentAd')
    });
    document.addEventListener('onDismissAd', function () {
      console.log('onDismissAd')
    });
    document.addEventListener('onLeaveToAd', function () {
      console.log('onLeaveToAd')
    });
    document.addEventListener('onReceiveInterstitialAd', function () { });
    document.addEventListener('onPresentInterstitialAd', function () { });
    document.addEventListener('onDismissInterstitialAd', function () { });
  }

  this.createAdmobBanner = function () {
    window.plugins.AdMob.createBannerView();
    window.plugins.AdMob.showAd(true,function(){},function(e){console.log(e);});


    // console.log(_bannerId)
    //     var _admob = window.plugins.AdMob;
    //     console.log(_admob.AD_SIZE.BANNER)
    //     _admob.createBannerView(
    //       {
    //         'publisherId': _bannerId,
    //         'adSize': _admob.AD_SIZE.BANNER,
    //         'bannerAtTop': false
    //       },
    //       function () {
    //         _admob.requestAd(
    //           { 'isTesting': true },
    //           function () {
    //             _admob.showAd(true);
    //           },
    //           function () {
    //             console.log('failed to request ad');
    //           }
    //         );
    //       },
    //       function (err) {
    //         console.log(err)
    //         console.log('failed to create banner view');
    //       }
    //     );
  };

  this.showInterstitial = function () {
    /* if(_isAdmobMissing()) {
         return false;
     }*/
    var _admob = window.plugins.AdMob;
    _admob.createInterstitialView(
      {
        'publisherId': _interstitialId
      },
      function () {
        _admob.requestInterstitialAd(
          { 'isTesting': false },
          function () {
            _admob.showInterstitialAd(true,
              function () { },
              function () { });
          },
          function () {

          }
        );
      },
      function () {

      }
    );
  };
});