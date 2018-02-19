var musicapp = angular.module('musicapp', ['ngRoute', 'appControllers']);


// configure our routes
musicapp.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'pages/home.html'
            //controller  : 'mainController'
        })
        .when('/addSongs', {
            templateUrl: 'pages/AddSongs.html',
            controller: 'addSongsController'
        })
        .when('/addSongDetails', {
            templateUrl: 'pages/AddSongDetails.html',
            controller: 'addSongDetailsController'
        })
        .when('/viewLanguageCategory', {
            templateUrl: 'pages/viewLanguageCategory.html',
            controller: 'viewLanguageController'
        })
        .when('/viewSongs', {
            templateUrl: 'pages/viewSongsList.html',
            controller: 'viewSongsController'
        })
        .when('/addSongChords', {
            templateUrl: 'pages/addSongChords.html',
            controller: 'addSongChordsController'
        })
        .when('/mapChordsToSongs', {
            templateUrl: 'pages/mapChordsToSongs.html',
            controller: 'mapChordsToSongsController'
        })
        .when('/editSongDetails', {
            templateUrl: 'pages/editSongDetails.html',
            controller: 'updateSongDetailsController'
        })
        // route for the about page
        .when('/addMainCategory', {
            templateUrl: 'pages/AddMainCategory.html',
            controller: 'addLanguageController'
        })
        .when('/viewChords', {
            templateUrl: 'pages/chordsMaster.html',
            controller: 'chordsMasterController'
        })
        .when('/sendPushNotification', {
            templateUrl: 'pages/pushNotification.html',
            controller: 'pushNotificationController'
        });


});

