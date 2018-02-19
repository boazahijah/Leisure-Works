// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var appbase = angular.module('musicapp', ['ionic', 'basicAppControllers', 'ngCordova', 'pushservice', 'appService']);


appbase.run(function ($ionicPlatform, $cordovaPush, $rootScope, $http, $location, $state, AdmobService,$ionicHistory,$ionicPopup) {

  $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
    alert('please check network connectivity');
  });

  $rootScope.homeScreen = function () {
    // do some stuff
    $state.go('index');
  }




  $ionicPlatform.ready(function () {
    if (window.plugins && window.plugins.AdMob) {
      var _admob_banner_key = "ca-app-pub-9967662179821145/1468008199";
      var _admob_interstitial_key =  "ca-app-pub-9967662179821145/3818839367";
      AdmobService.init(_admob_banner_key, _admob_interstitial_key);
      AdmobService.createAdmobBanner();
     // AdmobService.showInterstitial();
    } else {

    }




    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

  });



  var androidConfig = {
    "senderID": "1001945980306"
  };


  document.addEventListener("deviceready", function () {
    console.log("device :" + device.uuid);
    $cordovaPush.register(androidConfig).then(function (result) {
      console.log("result: " + result);

      // alert('result '+  result);


    });

  });


  $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
    switch (notification.event) {
      case 'registered':
        if (notification.regid.length > 0) {
          //alert('registration ID = ' + notification.regid);
          // alert('device ID = ' + device.uuid);

          $http({
            method: 'POST',
            url: 'http://107.170.119.10:3000/admin/register',
            //url: 'http://localhost:3000/admin/register',
            data: {
              device_token: notification.regid,
              device_id: device.uuid
            }
          }).then(function () {
            //alert('error');
          });

        }
        break;

      case 'message':
        // this is the actual push notification. its format depends on the data model from the push server
        // alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
        break;

      case 'error':
        // alert('GCM error = ' + notification.msg);
        break;

      default:
        // alert('An unknown GCM event has occurred');
        break;
    }
  });





});

/* window.onNotification = function(e){
    alert("Event :"+  e.event);
      switch(e.event){
        case 'registered':
          if(e.regid.length > 0){

            var device_token = e.regid;
            alert(device_token);
            console.log(device_token);
            //var $injector = angular.element(document.body).injector();
            var $injector = angular.bootstrap(document, ['musicapp'])
            $injector.get("RequestsService").register(device_token).then(function(response){
              alert('registered!');
            });
                 
            
          }
        break;

        case 'message':
          alert('msg received: ' + e.message);
         
        break;

        case 'error':
          alert('error occured');
        break;

      }
};
*/

/*appbase.service('RequestsService', ['$http', '$q', '$ionicLoading', function($http,$q,$ionicLoading) {
 this.register=function(device_token){

var base_url = 'http://107.170.119.10:3000/admin';
       
            alert('asd');
            var deferred = $q.defer();
            $ionicLoading.show();

            $http.post(base_url + '/register', {'device_token': device_token})
                .success(function(response){

                    $ionicLoading.hide();
                    deferred.resolve(response);
                    console.log("response : " + response);

                })
                .error(function(data){
                    deferred.reject();
                });


            return deferred.promise;

       


       return {
            register: register
        };
}
}]);*/


window.errorHandler = function (error) {
  alert('an error occured');
}

appbase.config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $cordovaAppRateProvider) {

  document.addEventListener("deviceready", function () {

    var prefs = {
      language: 'en',
      appName: 'ChordsNSongs',
      androidURL: 'market://details?id=com.ionicframework.songchordsapp989123'
    };

    $cordovaAppRateProvider.setPreferences(prefs)

  }, false);

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://www.youtube.com/**'
  ]);

  $stateProvider
    //.state('splash', { url: '/', templateUrl: 'templates/splashSlider.html'})
    //.state('index', { url: '/index', templateUrl: 'index.html',controller: 'viewLanguageController'})
    .state('intro', { url: '/intro', templateUrl: 'templates/intro.html', controller: 'introController' })
    .state('index', { url: '/', templateUrl: 'templates/home.html', controller: 'viewLanguageController' })
    .state('home', { url: '/home', templateUrl: 'templates/home.html' })
    .state('songsdetails', { url: '/songsdetails', templateUrl: 'templates/songsDetailsLayout.html' })
    .state('songrequest', { url: '/songrequest', templateUrl: 'templates/songRequest.html' })
    .state('favourites', { url: '/favourites', templateUrl: 'templates/favourites.html' })
    .state('searchSong', { url: '/searchSong', templateUrl: 'templates/searchSong.html', controller: 'searchSongController' })
    /*.state('songsdetails.sheet', {
      url: '/sheet',
    views: {
    'songsdetails-sheet': {
    templateUrl: 'templates/songSheet.html'
   }
   }
   })
    .state('songsdetails.chords', {
      url: '/chords',
    views: {
    'songsdetails-chords': {
    templateUrl: 'templates/songChords.html'
   }
   }
   })
    .state('songsdetails.videos', {
      url: '/videos',
    views: {
    'songsdetails-videos': {
    templateUrl: 'templates/songVideos.html'
   }
   }
   })*/
    .state('songslist', {
      url: '/songslist',
      templateUrl: 'templates/songsList.html'
    });
  $urlRouterProvider.otherwise("/");
});






