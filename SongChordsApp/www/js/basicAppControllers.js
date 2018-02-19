// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var basicAppControllers = angular.module('basicAppControllers', ['ionic','appService','LocalStorageModule','ngCordova','ngSanitize']);

basicAppControllers.controller('introController', function($scope, $state,$ionicSideMenuDelegate,$ionicViewService,localStorageService) {

 // Called to navigate to the main app
 localStorageService.set("viewCount","0");

  $scope.startApp = function() {
    window.localStorage['didTutorial'] = true;
    $state.go('index');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  }; 
});

basicAppControllers.controller('homecontroller', ['$scope', function($scope) {
   $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
}]);



basicAppControllers.filter('beautifyChords', function ($sce) {
        return function (lyricString) {

          if(lyricString != "") {
      //lyricString.replace(//g , "newchar");
       return $sce.trustAsHtml(lyricString.replace(/[(]/g, '<b><font color=#B03A2E><i> (').replace(/[)]/g, ')</i></font></b>').replace('[', '<b><font color=#9A7D0A>[').replace(']',']</font></b>') );
       
    }
  }
});


basicAppControllers.controller('searchSongController', ['$scope','$ionicPopup','$cordovaToast','$state','$ionicLoading','$location','$ionicTabsDelegate','$ionicLoading','viewSongsServ','viewSongDetailsServ','localStorageService','controllerIntermediate',function($scope,$ionicPopup,$cordovaToast,$state,$ionicLoading,$location,$ionicTabsDelegate,$ionicLoading,viewSongsServ,viewSongDetailsServ,localStorageService,controllerIntermediate) {
    $scope.songsData = []; 
   $scope.songDetails = {};
   $scope.songtest = {};

   $scope.searchSong = function(songName, songkey,languageName){
    if(angular.isUndefined(songName)){
      songName= "";
    }
    if(songName != "" && songName.length >= 3){
      $ionicLoading.show();
    viewSongDetailsServ.filterSongsByName(songName,function(res){
      if(res.status == "200"){
        $scope.songsData = res.data;
      }
      $ionicLoading.hide();
    });
  }else{
     $scope.songsData = {};
    //$scope.getTotalRecordCount(songName,songkey,languageName);
  }
  }



 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Message',
     template: 'The Song details were not updated by admin yet. Please try again later, !'
   });

   alertPopup.then(function(res) {
     //console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
  

  $scope.showToast = function(message, duration, location) {
        $cordovaToast.show(message, duration, location).then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    }

  $scope.onHold = function(songname) {
  /*didUserHoldForThreeSeconds = event.timestamp;*/
  //alert(localStorageService.get("favourites").length);
  if(localStorageService.get("favourites") == null){
    localStorageService.set("favourites",[]);
    for(var i=0; i<$scope.songsData.length;i++){
      if($scope.songsData[i].songName == songname){
       var arr =  localStorageService.get("favourites");
       arr.push($scope.songsData[i]);
       localStorageService.set("favourites",arr);
      }
    }

    $scope.showToast('Song added to your favourites', 'short', 'bottom');
  }else{
    for(var i=0; i<$scope.songsData.length;i++){
      if($scope.songsData[i].songName == songname){
       var arr =  localStorageService.get("favourites");
       arr.push($scope.songsData[i]);
       localStorageService.set("favourites",arr);
      }
    }
  }
 // alert(angular.toJson(localStorageService.get("favourites"),"pretty"));
  $scope.showToast('Song added to your favourites', 'short', 'bottom');
 // alert('touch hold');
};

  $scope.loadSongsDetails = function(){
       viewSongsServ.viewSongs(function(res){  
          if(res.status == "200"){
           $scope.songsData = res.data;
          
          }
          
        });
    }

    $scope.viewSongDetails = function(songName){
      $ionicLoading.show();
      viewSongDetailsServ.viewSongDetails(songName,function(res){  
          if(res.status == "200"){
            $scope.songDetails = res.data[0];
          //alert(angular.toJson($scope.songDetails));
            controllerIntermediate.setSongDetails($scope.songDetails);
            localStorageService.set("songdetails",$scope.songDetails);
      viewSongDetailsServ.viewChordDetails(songName,function(res){  
          if(res.status == "200"){
            var chordsArr = [];
             if(angular.isUndefined(res.data[0])){
            }else{
            if(res.data[0].chordDetails.length != 0){
                for(var i=0; i<res.data[0].chordDetails.length; i++){
                  chordsArr.push(res.data[0].chordDetails[i].chordname);
                }
            }
          }
            if(chordsArr.length !=0){

              viewSongDetailsServ.viewChordImage(chordsArr,function(res){
                if(res.status == "200"){
                 // console.log(angular.toJson(res,"pretty"));
                 controllerIntermediate.setChordImageDetails(res.data);
                 localStorageService.set("chorddetails",res.data);
                 //alert(angular.toJson(controllerIntermediate.getChordImageDetails()));
                }
                $ionicLoading.hide();
        $location.path('/songsdetails');
              });
            }else{
               $ionicLoading.hide();
               $scope.showAlert();
            }

          }
        });

          }
    });

  }


   
}]);



basicAppControllers.controller('socialSharingController', ['$scope','$cordovaAppRate','$location','$ionicSideMenuDelegate','$cordovaSocialSharing','$cordovaToast', '$http', function($scope,$cordovaAppRate,$location,$ionicSideMenuDelegate,$cordovaSocialSharing,$cordovaToast,$http) {
   $scope.share = function () {
    $cordovaSocialSharing.share('Download the app for free and enjoy playing your favourite songs in guitar. ', 'ChordsNSongs', null, 'https://play.google.com/store/apps/details?id=com.ionicframework.songchordsapp989123');
  }


   $scope.showToast = function(message, duration, location) {
        $cordovaToast.show(message, duration, location).then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    }


    $scope.requestSong = function () {
      $ionicSideMenuDelegate.toggleLeft();
      $location.path("/songrequest");
    }

    $scope.showFavourites = function () {
      $ionicSideMenuDelegate.toggleLeft();
      $location.path("/favourites");
    }

     $scope.searchSong = function () {
      $ionicSideMenuDelegate.toggleLeft();
      $location.path("/searchSong");
    }
  $scope.rateMyApp = function () {
      /*$cordovaAppRate.promptForRating(true).then(function (result) {
          // success
          console.log("apprate");
      });*/
        $cordovaAppRate.navigateToAppStore().then(function (result) {
        // success
        });
    }

    $scope.testPush = function () {
      $http({
    method: 'POST',
    url: appurl+'/admin/pushtest'
  }).then(function(res){  
        if(res.status == "200"){
         console.log("push ok");
        }
      });
    }


}]);


basicAppControllers.controller('requestSongsController', ['$scope','$ionicPopup','$cordovaToast','$ionicLoading','$location','$ionicTabsDelegate','viewSongsServ','viewSongDetailsServ','localStorageService','controllerIntermediate','submitRequest', function($scope,$ionicPopup,$cordovaToast,$ionicLoading,$location,$ionicTabsDelegate,viewSongsServ,viewSongDetailsServ,localStorageService,controllerIntermediate,submitRequest) {
  $scope.songname = "";
  $scope.moviename = "";
 $scope.songRequest = {

  };
  $scope.validateForm = function(songname, moviename){
   if((angular.isUndefined(songname) || angular.isUndefined(moviename)) || (songname=="" || moviename=="")){
      $scope.showAlert();
    }else{
      var request = {
        'songname' : songname,
        'moviename' : moviename,
        'status': 'S'
      }
      $ionicLoading.show();
      submitRequest.submitSongRequest(request,function(res){
       if(res.status=="200"){
           $ionicLoading.hide();
           $scope.showConfirm();
        }
      });
    }
  }
   $scope.submitRequest = function() {

   }
   $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Message',
     template: 'Forgot your favourite song and movie name?'
   });

   alertPopup.then(function(res) {
     //console.log('Thank you for not eating my delicious ice cream cone');
   });
 };

  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'You have sent a song request',
     template: 'Do you need to add more requests?',
     cancelText: 'No Thanks',
     okText: 'Yes'
   });

   confirmPopup.then(function(res) {
     if(res) {
     $scope.songRequest.songname = "";
      $scope.songRequest.moviename = "";
     } else {
        $location.path("/");
     }
   });
 };




}]);

basicAppControllers.controller('sideMenuController', ['$scope','$ionicSideMenuDelegate', function($scope,$ionicSideMenuDelegate) {
   $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}]);

basicAppControllers.controller('sliderController', ['$scope','$ionicLoading','viewLanguageServ','controllerIntermediate','$location','localStorageService' , function($scope,$ionicLoading,viewLanguageServ,controllerIntermediate,$location,localStorageService){
  $scope.languageData = {};

 $scope.options = {
  onInit: function(swiper){
$scope.swiper = swiper;
},
onSlideChangeEnd: function(swiper){
if(swiper.activeIndex == 2){
$scope.viewLanguage();
}
}

}

  $scope.viewLanguage = function(){
   /* $ionicLoading.show();
    viewLanguageServ.viewLanguage(function(res){  
        if(res.status == "200"){
          $scope.languageData = res.data;

          controllerIntermediate.setCategoryData(res.data);
          $ionicLoading.hide();
          $location.path("/home");
        }
      });*/
       $location.path("/index");

  }
}]);



basicAppControllers.controller('viewLanguageController', ['$scope','$ionicLoading','viewLanguageServ','controllerIntermediate','$location','localStorageService','$state' , '$rootScope','$ionicPlatform', function($scope,$ionicLoading,viewLanguageServ,controllerIntermediate,$location,localStorageService,$state, $rootScope,$ionicPlatform){
  $scope.languageData = {};

if(window.localStorage['didTutorial'] === "true") {
    console.log('Skip intro');
  }else{
    $state.go('intro');
  }



 $scope.options = {
  onInit: function(swiper){
$scope.swiper = swiper;
},
onSlideChangeEnd: function(swiper){
if(swiper.activeIndex == 2){
$scope.viewLanguage();
}
}

}
 $scope.viewLanguage = function(){
    $ionicLoading.show();
   // $scope.languageData = controllerIntermediate.getCategoryData();
    //alert(angular.toJson($scope.languageData));
    viewLanguageServ.viewLanguage(function(res){  
     // alert('as');
        if(res.status == "200"){
          $scope.languageData = res.data;
          //controllerIntermediate.setCategoryData($scope.languageData);
          $ionicLoading.hide();
         // $location.path("/home");
        }
      });

  }
   $scope.viewCategory = function(language){
        $ionicLoading.show();
   		   localStorageService.set("languageselection",language);
        //alert(localStorageService.get('languageselection'));
        controllerIntermediate.setLanguage(language);
        $location.path("/songslist");
   }


 $scope.viewLanguage();
}]);

basicAppControllers.controller('favouriteSongsController', ['$scope','$ionicPopup','$cordovaToast','$ionicLoading','$location','$ionicTabsDelegate','viewSongsServ','viewSongDetailsServ','localStorageService','controllerIntermediate',function($scope,$ionicPopup,$cordovaToast,$ionicLoading,$location,$ionicTabsDelegate,viewSongsServ,viewSongDetailsServ,localStorageService,controllerIntermediate) {
$scope.songsData = [];
$scope.loadFavourites = function(){
  if(localStorageService.get("songdontshowfav") == null || localStorageService.get("songdontshowfav") != "yes"){
        $scope.showFav();
  }
  $scope.songsData = localStorageService.get("favourites");
  //alert(localStorageService.get("favourites"));
}


 $scope.showFav = function() {
   var favPopup = $ionicPopup.confirm({
     title: 'Message',
     template: 'Long tap the song in order to remove it from favourites',
     okText: 'Dont show it again.',
     cancelText: 'Ok'
   
   });
 favPopup.then(function(res) {
     if(res) {
    localStorageService.set("songdontshowfav","yes");
     } else {
       
     }
   });
 };


 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Message',
     template: 'The Song details were not updated by admin yet. Please try again later, !'
   });

   alertPopup.then(function(res) {
     //console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
  

$scope.showToast = function(message, duration, location) {
        $cordovaToast.show(message, duration, location).then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    }

$scope.removeSongFromFavourites = function(songname){
  //alert($scope.songsData.length);
  for(var i=0; i<$scope.songsData.length;i++){
      //alert(angular.toJson($scope.songsData[i],"pretty"));
      if($scope.songsData[i].songName == songname){
       var arr =  localStorageService.get("favourites");
       arr.splice(i,1);
       localStorageService.set("favourites",arr);
       $scope.songsData = localStorageService.get("favourites");
      }
    }
    $scope.showToast('Song removed from your favourites', 'short', 'bottom');
}


    $scope.viewSongDetails = function(songName){
      $ionicLoading.show();
      viewSongDetailsServ.viewSongDetails(songName,function(res){  
          if(res.status == "200"){
            $scope.songDetails = res.data[0];
          //alert(angular.toJson($scope.songDetails));
            controllerIntermediate.setSongDetails($scope.songDetails);
            localStorageService.set("songdetails",$scope.songDetails);
      viewSongDetailsServ.viewChordDetails(songName,function(res){  
          if(res.status == "200"){
            var chordsArr = [];
              if(angular.isUndefined(res.data[0])){
            }else{
            if(res.data[0].chordDetails.length != 0){
                for(var i=0; i<res.data[0].chordDetails.length; i++){
                  chordsArr.push(res.data[0].chordDetails[i].chordname);
                }
            }
          }
            if(chordsArr.length !=0){

              viewSongDetailsServ.viewChordImage(chordsArr,function(res){
                if(res.status == "200"){
                 // console.log(angular.toJson(res,"pretty"));
                 controllerIntermediate.setChordImageDetails(res.data);
                 localStorageService.set("chorddetails",res.data);
                 //alert(angular.toJson(controllerIntermediate.getChordImageDetails()));
                }
                $ionicLoading.hide();
        $location.path('/songsdetails');
              });
            }else{
              $ionicLoading.hide();
               $scope.showAlert();
            }

          }
        });

          }
    });

  }

$scope.loadFavourites();
}]);

basicAppControllers.controller('viewSongsController', ['$scope','$ionicPopup','$cordovaToast','$state','$ionicLoading','$location','$ionicTabsDelegate','$ionicLoading','viewSongsServ','viewSongDetailsServ','localStorageService','controllerIntermediate',function($scope,$ionicPopup,$cordovaToast,$state,$ionicLoading,$location,$ionicTabsDelegate,$ionicLoading,viewSongsServ,viewSongDetailsServ,localStorageService,controllerIntermediate) {
   $scope.songsData = []; 
   $scope.songDetails = {};
   $scope.songtest = {};

   //var language = "";
   $scope.languageName = "";
   //$scope.totalRecords = 0;

   $scope.totalRecords = 0;

   $scope.itemsPerPage = 10;
   $scope.noMoreItemsAvailable = false;
   $scope.songindex = 1;
   $scope.songindexSearch = 1;

 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Message',
     template: 'The Song details were not updated by admin yet. Please try again later, !'
   });

   alertPopup.then(function(res) {
     //console.log('Thank you for not eating my delicious ice cream cone');
   });
 };


  $scope.showFav = function() {
   var favPopup = $ionicPopup.confirm({
     title: 'Message',
     template: 'Long tap the song in order to add it to favourites',
     okText: 'Dont show it again.',
     cancelText: 'Ok'
   
   });
 favPopup.then(function(res) {
     if(res) {
    localStorageService.set("songdontshow","yes");
     } else {
       
     }
   });
 };
  

   $scope.loadMore = function() {
      $scope.songindex = $scope.songindex + 1;
      $scope.loadSongsByPaginate($scope.songname,"",$scope.languageName,$scope.songindex);
      
  };

  $scope.searchSongs = function() {
      //alert('asd');
      
  };
  
  $scope.showToast = function(message, duration, location) {
        $cordovaToast.show(message, duration, location).then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    }

  $scope.onHold = function(songname) {
  /*didUserHoldForThreeSeconds = event.timestamp;*/
  //alert(localStorageService.get("favourites").length);
  if(localStorageService.get("favourites") == null){
    localStorageService.set("favourites",[]);
    for(var i=0; i<$scope.songsData.length;i++){
      if($scope.songsData[i].songName == songname){
       var arr =  localStorageService.get("favourites");
       arr.push($scope.songsData[i]);
       localStorageService.set("favourites",arr);
      }
    }

    $scope.showToast('Song added to your favourites', 'short', 'bottom');
  }else{
    for(var i=0; i<$scope.songsData.length;i++){
      if($scope.songsData[i].songName == songname){
       var arr =  localStorageService.get("favourites");
       arr.push($scope.songsData[i]);
       localStorageService.set("favourites",arr);
      }
    }
  }
 // alert(angular.toJson(localStorageService.get("favourites"),"pretty"));
  $scope.showToast('Song added to your favourites', 'short', 'bottom');
 // alert('touch hold');
};
  
   $scope.selectTabWithIndex = function(index) {
   	if(index == 0){
   		$('#div1').hide();
   		$('#div2').hide();
   		$('#div0').show();
   	}
   	if(index == 1){
   		$('#div0').hide();
   		$('#div2').hide();
   		$('#div1').show();
   	}
   	if(index == 2){
   		$('#div1').hide();
   		$('#div0').hide();
   		$('#div2').show();
   	}
	
    $ionicTabsDelegate.select(index);
  }

$scope.searchSong = function(songName, songkey,languageName){
    if(angular.isUndefined(songName)){
      songName= "";
    }
    if(angular.isUndefined(songkey)){
      
      songkey = "";
    }
    viewSongDetailsServ.filterSongs(songName,songkey,languageName, function(res){
      if(res.status == "200"){
        $scope.songsData = res.data;
      }
    });
    //$scope.getTotalRecordCount(songName,songkey,languageName);
  }


/* $scope.loadSongsByPaginateForSearch = function(songName, songkey,languageName,currentPage){
    if(angular.isUndefined(songName)){
      songName= "";
    }
    if(angular.isUndefined(songkey)){
      
      songkey = "";
    }

    viewSongDetailsServ.getSongsByPaginate(songName,songkey,languageName,currentPage, function(res){
      if(res.status == "200"){
     
        $scope.songsData = res.data;
       
      }
    });
  }*/


  $scope.loadSongsByPaginate = function(songName, songkey,languageName,currentPage){
    //alert(currentPage);

     
    
    if(angular.isUndefined(songName)){
      songName= "";
    }
    if(angular.isUndefined(songkey)){
      
      songkey = "";
    }

    viewSongDetailsServ.getSongsByPaginate(songName,songkey,languageName,currentPage, function(res){
      if(res.status == "200"){
      // $scope.songsData = res.data;
       //$scope.songsData.push=res.data;
       //alert(res.data.length);
        $scope.songsData = $scope.songsData.concat(res.data);
       console.log(angular.toJson($scope.songsData,"pretty"));
       if(res.data.length == 0){
        $scope.noMoreItemsAvailable = true;
       }
      // $scope.$apply(function(){
     $scope.$broadcast('scroll.infiniteScrollComplete');
//});
             //alert(angular.toJson($scope.songsData));
           $ionicLoading.hide();  

           if(localStorageService.get("songdontshow") == null || localStorageService.get("songdontshow") != "yes"){
        $scope.showFav();
      }
      }
    });
  }


    $scope.loadSongsDetails = function(){
       viewSongsServ.viewSongs(function(res){  
          if(res.status == "200"){
           $scope.songsData = res.data;
          
          }
          
        });
    }

    $scope.viewSongDetails = function(songName){
    	$ionicLoading.show();
      viewSongDetailsServ.viewSongDetails(songName,function(res){  
          if(res.status == "200"){
           	$scope.songDetails = res.data[0];
          //alert(angular.toJson($scope.songDetails));
            controllerIntermediate.setSongDetails($scope.songDetails);
            localStorageService.set("songdetails",$scope.songDetails);
			viewSongDetailsServ.viewChordDetails(songName,function(res){  
          if(res.status == "200"){
            var chordsArr = [];
            if(angular.isUndefined(res.data[0])){
            }else{
            if(res.data[0].chordDetails.length != 0){
                for(var i=0; i<res.data[0].chordDetails.length; i++){
                  chordsArr.push(res.data[0].chordDetails[i].chordname);
                }
            }
            }
            if(chordsArr.length !=0){

              viewSongDetailsServ.viewChordImage(chordsArr,function(res){
                if(res.status == "200"){
                 // console.log(angular.toJson(res,"pretty"));
                 controllerIntermediate.setChordImageDetails(res.data);
                 localStorageService.set("chorddetails",res.data);
                 //alert(angular.toJson(controllerIntermediate.getChordImageDetails()));
                }
                $ionicLoading.hide();
				$location.path('/songsdetails');
              });
            }else{
               $ionicLoading.hide();
               $scope.showAlert();

            }

          }
        });

          }
		});

	}

     $scope.loadInitial = function(){
     /* if(localStorageService.get("songdontshow") != null){
          if(localStorageService.get("songdontshow") == "yes"){
          }else{
            $scope.showFav();
          }
      }*/



      $ionicLoading.show();
      $scope.languageName = controllerIntermediate.getLanguage();
      if($scope.languageName == ""){
        $scope.languageName = localStorageService.get('languageselection');
      }
      $scope.loadSongsByPaginate("","",$scope.languageName,$scope.songindex);
      
	}
 $scope.loadInitial();
 
}]);


basicAppControllers.controller('viewSongDetailsController', ['$scope','$rootScope','$ionicTabsDelegate','$ionicLoading','viewSongsServ','viewSongDetailsServ','controllerIntermediate','localStorageService','$location','$timeout','$ionicScrollDelegate','$anchorScroll','AdmobService',function($scope,$rootScope,$ionicTabsDelegate,$ionicLoading, viewSongsServ,viewSongDetailsServ,controllerIntermediate, localStorageService,$location,$timeout,$ionicScrollDelegate,$anchorScroll,AdmobService) {
   var count = 0;
   count = localStorageService.get("viewCount");
   count = parseInt(count);
   if(count > 2){
     AdmobService.showInterstitial();
     localStorageService.set("viewCount","0")
   }else{
     count++;
     localStorageService.set("viewCount",count);
   }

  scrollTo =   function (elementId) {
        $timeout(function() {
           $location.hash(elementId);
            $anchorScroll();
           $ionicScrollDelegate.anchorScroll(true);
        });
    },

   $scope.selectTabWithIndex = function(index) {
    
    
   	if(index == 0){
      
   		$('#div1').hide();
   		$('#div2').hide();
   		$('#div0').show();
      scrollTo('div0');
   	}
   	if(index == 1){
     
   		$('#div0').hide();
   		$('#div2').hide();
   		$('#div1').show();
      scrollTo('div1');
   	}
   	if(index == 2){
    
   		$('#div1').hide();
   		$('#div0').hide();
   		$('#div2').show();
      scrollTo('div2');
   	}
	
    $ionicTabsDelegate.select(index);
  }



$scope.externalYoutube = function(videoid){
    window.open('https://www.youtube.com/watch?v='+videoid,'_system','location=yes');
    return false;
   }

     $scope.loadInitial = function(){
      //$ionicLoading.show() ;
      $scope.songDetails = controllerIntermediate.getSongDetails();
      $scope.songChords = controllerIntermediate.getChordImageDetails();
      
      if(jQuery.isEmptyObject($scope.songDetails)){
        $scope.songDetails = localStorageService.get("songdetails");
        $scope.songChords = localStorageService.get("chorddetails");

      }
     
      //$ionicLoading.hide() ;
      }
     $scope.openModal = function(videoid){
      var videourl="https://youtube.com/embed/";
      videourl = videourl + videoid;
      videourl = videourl + "?autoplay=1";
      var iframeConstruct = "";
      iframeConstruct = iframeConstruct + " <iframe width='700' height='320'";
      iframeConstruct = iframeConstruct + " src='"+videourl+"'> </iframe>";
      console.log(iframeConstruct);
      $('#videocontent').html(iframeConstruct);
      $('#modal1').openModal({
        complete : onModalHide
      });
      //alert(videoUrl);
     }

     $scope.openImage = function(imagesrc){
          var imagetag = "";
          imagetag = imagetag + "<img src='"+imagesrc+"'/>";
          $('#imagecontent').html(imagetag);
          $("#imagemodal").openModal();
     }


     var onModalHide = function(){
      $('#videocontent').html("");
     }
      

  
  $scope.loadInitial();

}]);





