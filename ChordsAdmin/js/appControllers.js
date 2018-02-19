var appCtrl = angular.module('appControllers', ['appService']);

appCtrl.controller('addLanguageController', ['$scope', 'addLanguageServ', function ($scope, addLanguageServ) {
  $scope.greeting = 'Hola!';

  $scope.addLanguage = function () {
    //alert(angular.toJson($scope.languageform,"pretty"));
    addLanguageServ.addLanguage(angular.toJson($scope.languageform), function (res) {
      alert(angular.toJson(res.status));
    });
  }

}]);

appCtrl.controller('addSongChordsController', ['$scope', 'addChordsServ', function ($scope, addChordsServ) {
  $scope.greeting = 'Hola!';

  $scope.addChords = function () {
    alert(angular.toJson($scope.chords, "pretty"));
    addChordsServ.addChords(angular.toJson($scope.chords), function (res) {
      alert(angular.toJson(res.status));
    });
  }

}]);

appCtrl.controller('chordsMasterController', ['$scope', 'viewChordsMaster', function ($scope, viewChordsMaster) {
  $scope.greeting = 'Hola!';
  $scope.chordsdata = {};
  $scope.viewChordsMaster = function () {
    alert('asd');
    viewChordsMaster.viewChords(function (res) {

      $scope.chordsdata = res.data;
      // $scope.chordsdata = 
    });
  }

  $scope.viewChordsMaster();

}]);

appCtrl.controller('viewLanguageController', ['$scope', 'viewLanguageServ', function ($scope, viewLanguageServ) {
  $scope.greeting = 'Hola!';
  $scope.languageData = {};
  $scope.viewLanguage = function () {

    viewLanguageServ.viewLanguage(function (res) {
      if (res.status == "200") {
        //alert(angular.toJson(res.data[0].toSource(),"pretty"));
        $scope.languageData = res.data;

        $('.element').animateOneByOne({
          css: {
            opacity: '1'
          },
          duration: 450,
          interval: 100,
          callback: function () {
            $('.show').fadeOut(400, function () {
              $('.hide').fadeIn(400);
            });

          }
        });

        // alert(angular.toJson(res,"pretty"));
      }
      //alert(angular.toJson(res,"pretty"));
    });
  }

  $scope.viewImage = function (langId) {
    for (var i = 0; i < $scope.languageData.length; i++) {
      if ($scope.languageData[i]._id == langId) {
        $scope.imageData = $scope.languageData[i].imageData;
        $('#modal1').openModal();
      }
    }
  }
}]);


appCtrl.controller('addSongsController', ['$scope', 'viewLanguageServ', 'addSongsServ', function ($scope, viewLanguageServ, addSongsServ) {
  var languageDetails = {};

  $scope.loadLanguageDetails = function () {
    viewLanguageServ.viewLanguage(function (res) {
      if (res.status == "200") {
        $scope.languageDetails = res.data;
        // alert(angular.toJson(res,"pretty"));
      }
      //alert(angular.toJson(res,"pretty"));
    });
  }

  $scope.addSongs = function () {
    alert(angular.toJson($scope.addSongsForm, "pretty"));
    addSongsServ.addSongs(angular.toJson($scope.addSongsForm), function (res) {
      alert(angular.toJson(res.status));
    });
  }

}]);

appCtrl.controller('viewSongsController', ['$scope', 'viewSongsServ', 'viewSongDetailsServ', 'controllerIntermediate', '$location', function ($scope, viewSongsServ, viewSongDetailsServ, controllerIntermediate, $location) {
  var songsData = {};
  $scope.songDetails = {};

  $scope.loadSongsDetails = function () {
    viewSongsServ.viewSongs(function (res) {
      if (res.status == "200") {
        $scope.songsData = res.data;
        //alert(angular.toJson($scope.songsData));
        // alert(angular.toJson(res));
      }

    });
  }

  $scope.viewSongDetails = function (songName) {

    viewSongDetailsServ.viewSongDetails(songName, function (res) {
      if (res.status == "200") {
        // alert('asd');
        alert(angular.toJson(res.data[0]));
        $scope.songDetails = res.data[0];


        $('#modal1').openModal();
        //alert(angular.toJson($scope.songsData));
        // alert(angular.toJson(res));
      }

    });
    //alert(imageId);
    //alert(songName);

  }

  $scope.editSongDetails = function (id) {

    viewSongDetailsServ.viewSongDetails(id, function (res) {
      if (res.status == "200") {
        // alert('asd');
        //alert(angular.toJson(res));
        //$scope.songDetails = res.data[0];
        alert(angular.toJson(res.data[0]));

        controllerIntermediate.setpallaviDetails(res.data[0].pallaviDetails);
        controllerIntermediate.setsaranamDetails(res.data[0].saranamDetails);
        controllerIntermediate.setTip(res.data[0].songTips);

        // alert(angular.toJson(res,"pretty"));
        controllerIntermediate.setvideoDetails(res.data[0].videodetails);
        controllerIntermediate.setlanguagename(res.data[0].languagename);
        controllerIntermediate.setsongName(res.data[0].songname);
        controllerIntermediate.setsongkey(res.data[0].songkey);
        $location.path('/editSongDetails');
        //$('#modal1').openModal();
        //alert(angular.toJson($scope.songsData));
        // alert(angular.toJson(res));
      }

    });
    //alert(imageId);
    //alert(songName);

  }

  /*$scope.viewImage = function(imageId){
    //alert(imageId);
for(var i=0; i<$scope.songsData.length;i++){
    if($scope.songsData[i]._id ==  imageId){
       $scope.imageData = $scope.songsData[i].imageData;
       $('#modal1').openModal();
    }
  }
}*/

}]);


appCtrl.controller('addSongDetailsController', ['$scope', 'addSongDetailsServ', 'viewLanguageServ', 'viewSongsServ', function ($scope, addSongDetailsServ,
  viewLanguageServ, viewSongsServ) {
  $scope.songForm = {};

  $scope.songForm.pallaviDetails = [{ id: 'pallaviLine1' }];
  $scope.songForm.saranamDetails = [{ id: 'saranamLine1' }];
  $scope.songForm.videodetails = [{ id: 'videoline1' }];
  $scope.songForm.songTips = [{ id: 'tipline1' }];


  var init = function () {
    viewLanguageServ.viewLanguage(function (res) {
      if (res.status == "200") {
        // alert(res.data);
        $scope.languageDetails = res.data;
        // alert(angular.toJson(res,"pretty"));
      }
      //alert(angular.toJson(res,"pretty"));
    });

  }

  $scope.loadSongs = function (languagename) {
    viewSongsServ.viewSongsByName(languagename, function (res) {
      if (res.status == "200") {
        //alert(angular.toJson(res));
        $scope.songNames = res.data;
        //alert(angular.toJson($scope.songsData));
        // alert(angular.toJson(res));
      }

    });
  }


  $scope.add_pallavi = function () {
    var newItemNo = $scope.songForm.pallaviDetails.length + 1;
    $scope.songForm.pallaviDetails.push({ 'id': 'pallaviLine' + newItemNo });
  };

  $scope.add_saranam = function () {
    var newItemNo = $scope.songForm.saranamDetails.length + 1;
    $scope.songForm.saranamDetails.push({ 'id': 'saranamLine' + newItemNo });
  };

  $scope.add_video = function () {
    var newItemNo = $scope.songForm.videodetails.length + 1;
    $scope.songForm.videodetails.push({ 'id': 'videoline' + newItemNo });
  };

  $scope.add_note = function () {
    var newItemNo = $scope.songForm.songTips.length + 1;
    $scope.songForm.songTips.push({ 'id': 'tipline' + newItemNo });
  };
  $scope.remove_note = function (item) {
    //alert(item);
    $scope.songForm.songTips.splice(item, 1);
  }

  $scope.remove_video = function (item) {
    //alert(item);
    $scope.songForm.videodetails.splice(item, 1);
  }



  $scope.remove_pallavi = function (item) {
    //alert(item);
    $scope.songForm.pallaviDetails.splice(item, 1);
  }

  $scope.remove_saranam = function (item) {
    $scope.songForm.saranamDetails.splice(item, 1);
  }



  $scope.addSongDetails = function () {
    alert(angular.toJson($scope.songForm, "pretty"));

    addSongDetailsServ.addSongDetails(angular.toJson($scope.songForm), $scope.notification, function (res) {
      alert(angular.toJson(res.status));
    });
  }

  init();


}]);




appCtrl.controller('updateSongDetailsController', ['$scope', 'addSongDetailsServ', 'viewLanguageServ', 'viewSongsServ', 'controllerIntermediate', function ($scope, addSongDetailsServ,
  viewLanguageServ, viewSongsServ, controllerIntermediate) {
  $scope.songForm = {};




  var init = function () {
    viewLanguageServ.viewLanguage(function (res) {
      if (res.status == "200") {
        // alert(res.data);
        $scope.languageDetails = res.data;
        // alert(angular.toJson(res,"pretty"));
      }
      //alert(angular.toJson(res,"pretty"));
    });
    //console.log(angular.toJson(controllerIntermediate.getpallaviDetails(),"pretty"));
    //alert(angular.toJson(controllerIntermediate.getvideoDetails(),"pretty"));
    if (angular.isUndefined(controllerIntermediate.getvideoDetails())) {
      $scope.songForm.videodetails = [{ id: 'videoline1' }];
    } else {
      $scope.songForm.videodetails = controllerIntermediate.getvideoDetails();
    }
    $scope.songForm.pallaviDetails = controllerIntermediate.getpallaviDetails();
    $scope.songForm.saranamDetails = controllerIntermediate.getsaranamDetails();
    // $scope.songForm.videodetails = controllerIntermediate.getvideoDetails();
    $scope.songForm.languagename = controllerIntermediate.getlanguagename();
    viewSongsServ.viewSongsByName($scope.songForm.languagename, function (res) {
      if (res.status == "200") {
        //alert(angular.toJson(res));
        $scope.songNames = res.data;
        //alert(angular.toJson($scope.songsData));
        // alert(angular.toJson(res));
      }

    });
    $scope.songForm.songname = controllerIntermediate.getsongName();
    $scope.songForm.songkey = controllerIntermediate.getsongkey();
    //alert( angular.toJson(controllerIntermediate.getTip().length));
    $scope.songForm.songTips = controllerIntermediate.getTip();










  }

  $scope.loadSongs = function (languagename) {
    viewSongsServ.viewSongsByName(languagename, function (res) {
      if (res.status == "200") {
        //alert(angular.toJson(res));
        $scope.songNames = res.data;
        //alert(angular.toJson($scope.songsData));
        // alert(angular.toJson(res));
      }

    });
  }


  $scope.add_pallavi = function () {
    var newItemNo = $scope.songForm.pallaviDetails.length + 1;
    $scope.songForm.pallaviDetails.push({ 'id': 'pallaviLine' + newItemNo });
  };

  $scope.add_saranam = function () {
    var newItemNo = $scope.songForm.saranamDetails.length + 1;
    $scope.songForm.saranamDetails.push({ 'id': 'saranamLine' + newItemNo });
  };

  $scope.add_video = function () {
    var newItemNo = $scope.songForm.videodetails.length + 1;
    $scope.songForm.videodetails.push({ 'id': 'videoline' + newItemNo });
  };

  $scope.add_note = function () {
    var newItemNo = $scope.songForm.songTips.length + 1;
    $scope.songForm.songTips.push({ 'id': 'tipline' + newItemNo });
  };
  $scope.remove_note = function (item) {
    //alert(item);
    $scope.songForm.songTips.splice(item, 1);
  }

  $scope.remove_video = function (item) {
    //alert(item);
    $scope.songForm.videodetails.splice(item, 1);
  }



  $scope.remove_pallavi = function (item) {
    //alert(item);
    $scope.songForm.pallaviDetails.splice(item, 1);
  }

  $scope.remove_saranam = function (item) {
    $scope.songForm.saranamDetails.splice(item, 1);
  }





  $scope.updateSongDetails = function () {
    alert(angular.toJson($scope.songForm, "pretty"));

    addSongDetailsServ.updateSongDetails(angular.toJson($scope.songForm), function (res) {
      alert(angular.toJson(res.status));
    });
  }

  init();


}]);


appCtrl.controller('mapChordsToSongsController', ['$scope', 'addSongDetailsServ', 'viewLanguageServ', 'viewSongsServ', 'viewChordsMaster', function ($scope, addSongDetailsServ,
  viewLanguageServ, viewSongsServ, viewChordsMaster) {
  $scope.songForm = {};

  $scope.songForm.chordDetails = [{ id: 'chordLine1' }];


  var init = function () {
    viewLanguageServ.viewLanguage(function (res) {
      if (res.status == "200") {
        // alert(res.data);
        $scope.languageDetails = res.data;
        // alert(angular.toJson(res,"pretty"));
      }
      //alert(angular.toJson(res,"pretty"));
    });
    viewChordsMaster.viewChords(function (res) {
      $scope.chordsdata = res.data;
      // $scope.chordsdata = 
    });

  }

  $scope.loadSongs = function (languagename) {
    viewSongsServ.viewSongsByName(languagename, function (res) {
      if (res.status == "200") {
        //alert(angular.toJson(res));
        $scope.songNames = res.data;
        //alert(angular.toJson($scope.songsData));
        // alert(angular.toJson(res));
      }

    });
  }


  $scope.addNewRow = function () {
    var newItemNo = $scope.songForm.chordDetails.length + 1;
    $scope.songForm.chordDetails.push({ 'id': 'chordLine' + newItemNo });
  };


  $scope.removeRow = function (item) {
    //alert(item);
    $scope.songForm.chordDetails.splice(item, 1);
  }


  $scope.addChordDetails = function () {
    //alert(angular.toJson($scope.songForm,"pretty"));

    addSongDetailsServ.addSongChordDetails(angular.toJson($scope.songForm), function (res) {
      alert(angular.toJson(res.status));
    });
  }

  init();


}]);


appCtrl.directive("fileread", function () {
  return {
    scope: {
      fileread: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            scope.fileread = loadEvent.target.result;
            /* alert(resizeImageServ.resizeImage(loadEvent.target.result,"30","30"));*/
            // scope.fileread = resizeImageServ.resizeImage(loadEvent.target.result,"30","30");
          });
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
});


appCtrl.controller('pushNotificationController', ['$scope', 'pushNotifyService', function ($scope, viewLanguageServ, addSongsServ) {

  $scope.sendPush = function () {
    alert(angular.toJson($scope.pushForm, "pretty"));
    pushNotifyService.addSongs(angular.toJson($scope.addSongsForm), function (res) {
      alert(angular.toJson(res.status));
    });
  }

}]);
