// routes/calendarRouter.js
var express = require('express');
var router = express.Router();

Language = require('../models/languageCategory');
Songs = require('../models/addSongs');
SongDetails = require('../models/songDetails');
Chords = require('../models/addChords');
ChordDetails = require('../models/songChordDetails');
SongReq = require('../models/songRequest');
DeviceDetails = require('../models/devicePushDetails');
/*var adminRouter = express();*/
var gcm = require('node-gcm');
var FCM = require('fcm-node');

const apiKey = "AAAAqMuJZVI:APA91bExcdPB3jEltVKq653xtr9IJcq7PpXOfbCC3p9yad3rijlNIbC4defM41uUugwuwX4zlJXQ0orHpdWTmTwLL_dAS8cfNTh0cmMruW2r-hg09jGQzhIWL0PDK8peaJLdCrCgHR5P";
const fcm = new FCM(apiKey);

var device_token;// invoked for any requested passed to this router
router.use(function (req, res, next) {
  // .. some logic here .. like any other middleware
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// will handle any request that ends in /events
// depends on where the router is "use()'d"

router.post('/register', function (req, res) {
  //var deviceDetails = req.body.data;
  /*  device_token = req.body.device_token;
    device_id = req.body.device_id*/
  console.log('device token received');
  var deviceDetailsReq = {
    device_token: req.body.device_token,
    device_id: req.body.device_id
  }

  DeviceDetails.getDeviceToken(deviceDetailsReq.device_id, function (err, deviceDetails) {
    //console.log(songDetails);
    if (err) {
      throw err;
    }
    console.log(deviceDetails.length);
    if (deviceDetails.length != 0) {
      DeviceDetails.updateToken(deviceDetailsReq.device_id, deviceDetailsReq, {}, function (err, deviceDetails) {
        if (err) {
          throw err;
        }
      });
    } else {
      DeviceDetails.registerToken(deviceDetailsReq, function (err, deviceDetails) {
        if (err) {
          throw err;
        }
      });
    }
    // res.json(deviceDetails);
  });
  res.send('ok');
});

router.post('/push', function (req, res) {

});


router.post('/addLanguage', function (req, res, next) {
  // ..
  var language = req.body.data;
  language = JSON.parse(language);
  //console.log(language);
  Language.addLanguage(language, function (err, language) {
    if (err) {

      throw err;
    }
    res.json(language);
  });
  res.send('ok');
});

router.post('/addChords', function (req, res, next) {
  // ..
  var chords = req.body.data;
  chords = JSON.parse(chords);
  //console.log(chords);
  Chords.addChords(chords, function (err, chords) {
    if (err) {

      throw err;
    }
    res.json(chords);
  });
  res.send('ok');
});

router.get('/chords', function (req, res, next) {
  //console.log("chords");
  Chords.viewChordsMaster(function (err, chords) {
    if (err) {
      throw err;
    }
    // console.log(chords);
    res.json(chords);
  });
  //res.send('ok');
});


router.get('/languages', function (req, res, next) {
  Language.getLanguage(function (err, language) {
    //console.log(language);
    if (err) {
      throw err;
    }
    res.json(language);
  });
});

router.post('/addSongs', function (req, res, next) {
  // ..
  var addSongs = req.body.data;
  addSongs = JSON.parse(addSongs);
  //console.log(language);
  Songs.addSongsList(addSongs, function (err, songs) {
    if (err) {

      throw err;
    }
    res.json(songs);
  });
  res.send('ok');
});

router.get('/songs', function (req, res, next) {
  Songs.getSongs(function (err, songs) {
    //console.log(songs);
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});

router.post('/addSongDetails', function (req, res, next) {
  // ..
  console.log("notification : yes or no : " + req.body.notification);

  var songDetails = req.body.data;
  songDetails = JSON.parse(songDetails);
  //console.log(language);
  SongDetails.addSongDetails(songDetails, function (err, songDetails) {
    if (err) {

      throw err;
    } else {
      console.log(req.body.notification);
      if (req.body.notification == "yes") {

        DeviceDetails.getRegisterTokens(function (err, deviceDetails) {
          if (err) {
            throw err;
          } else {
            if (deviceDetails.length != 0) {
              console.log("register tokens length : " + deviceDetails.length);
              var device_tokens = [];
              for (var i = 0; i < deviceDetails.length; i++) {
                device_tokens.push(deviceDetails[i].device_token);
              }
              console.log("added device tokens length : " + device_tokens.length);

              console.log('Going to  Push');

              message = {
                registration_ids: device_tokens,
                data: {
                  "title": "New songs added",
                  "message": "The song '" + songDetails.songname + "' has been added to our database. Please check out. Happy Guitaring.!",
                  "style": "inbox",
                  "summaryText": "There are %n% notifications",
                  "soundname": 'jinglebells',
                  "notId": Math.random() * 10,
                  "image": "icon",
                  "image-type": "circular",
                  "button": "S",
                  "songName": songDetails.songname
                }
              };



              fcm.send(message, (err, response) => {
                if (err) {
                  console.log(err);
                  console.log("Something has gone wrong!");
                } else {
                  console.log("Successfully sent with response: ", response);
                }
              });

              res.send('ok');
            }
          }
        });

      }
    }

  });
  res.send('ok');
});

router.post('/updateSongDetails', function (req, res, next) {
  // ..
  var songDetails = req.body.data;
  songDetails = JSON.parse(songDetails);
  songid = songDetails.songname;
  //console.log(songid);
  SongDetails.updateSongDetails(songid, songDetails, {}, function (err, songDetails) {
    if (err) {

      throw err;
    }
    res.json(songDetails);
  });
  res.send('ok');
});

router.post('/addChordDetails', function (req, res, next) {
  // ..
  var chordDetails = req.body.data;
  chordDetails = JSON.parse(chordDetails);
  //console.log(language);
  ChordDetails.addChordDetails(chordDetails, function (err, chordDetails) {
    if (err) {

      throw err;
    }
    res.json(chordDetails);
  });
  res.send('ok');
});

router.post('/songsByName', function (req, res, next) {
  // ..
  var languageName = req.body.data;

  Songs.getSongsByLang(languageName, function (err, songs) {
    if (err) {
      throw err;
    }
    res.json(songs);
  });
  //songDetails = JSON.parse(songDetails);
  //console.log(language);
  /*SongDetails.addSongDetails(songDetails, function(err, songDetails){
    if(err){

      throw err;
    }
    res.json(songDetails);
  });
  res.send('ok');*/
});

router.post('/songDetails', function (req, res, next) {
  var songName = req.body.data;
  //console.log(songName);
  SongDetails.getSongDetailsByName(songName, function (err, songDetails) {
    //console.log(songDetails);
    if (err) {
      throw err;
    }
    res.json(songDetails);
  });
});

router.post('/editSongDetails', function (req, res, next) {
  var id = req.body.data;
  console.log(id);
  SongDetails.getSongDetailsById(id, function (err, songDetails) {
    //console.log(songDetails);
    if (err) {
      throw err;
    }
    res.json(songDetails);
  });
});

router.post('/chordDetails', function (req, res, next) {
  var songName = req.body.data;
  //console.log(songName);
  ChordDetails.getChordDetailsByName(songName, function (err, chordDetails) {
    //console.log(songDetails);
    if (err) {
      throw err;
    }
    res.json(chordDetails);
  });
});

router.post('/chordImages', function (req, res, next) {
  var songchords = [];
  songchords = req.body.data;

  Chords.getChordsByName(songchords, function (err, songs) {
    //console.log(songDetails);
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});

router.post('/removeChord', function (req, res, next) {
  // ..
  //console.log(req.body);
  var chordname = req.body.chordname;
  console.log(req.body.chordname);
  Chords.removeChord(chordname, function (err, songs) {
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});


router.post('/removeSong', function (req, res, next) {
  // ..
  //console.log(req.body);
  var songname = req.body.songname;
  console.log(req.body.songname);
  Songs.removeSong(songname, function (err, songs) {
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});

router.post('/filterSongs', function (req, res, next) {
  // ..
  //console.log(req.body);
  var songname = req.body.songname;
  var songkey = req.body.songkey;
  var languagename = req.body.languagename;

  Songs.getSongsByNameAndKey(songname, songkey, languagename, function (err, songs) {
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});

router.post('/filterSongsExtend', function (req, res, next) {

  var songname = req.body.songname;
  var moviename = req.body.moviename;
  var languagename = req.body.languagename;

  Songs.filterSongsExtend(songname, moviename, languagename, function (err, songs) {
    if (err) {
      throw err;
    }
    // console.log(songs);
    res.json(songs);
  });
});


router.post('/filterSongsBySongName', function (req, res, next) {
  // ..
  //console.log(req.body);
  var songname = req.body.songname;
  Songs.getSongsByName(songname, function (err, songs) {
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});

router.post('/getTotalRecordCount', function (req, res, next) {
  // ..
  //console.log(req.body);
  var songname = req.body.songname;
  var songkey = req.body.songkey;
  var languagename = req.body.languagename;

  Songs.getTotalRecordCount(songname, songkey, languagename, function (err, songs) {
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});

router.post('/getSongsPaginate', function (req, res, next) {
  // ..

  var songname = req.body.songname;
  var songkey = req.body.songkey;
  var languagename = req.body.languagename;
  var pageno = req.body.pageno;
  // console.log(pageno);
  Songs.getSongsByNameAndKeyPaginate(songname, songkey, languagename, pageno, function (err, songs) {
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});

router.get('/fetchSongsV2', function (req, res, next) {
  var languageName = req.query.languageName;

  var pageNo = req.query.pageNo;
  var searchInput = req.query.searchInput;
  console.log(pageNo);
  console.log(languageName);
  console.log(searchInput);
  Songs.getSongsByNameAndMovie(languageName, pageNo, searchInput, function (err, songs) {
    if (err) {
      throw err;
    } else {
      // res.json(ringTones);d
    }
    // console.log(ringTones);
    res.json(songs);
  });

});

router.get('/songDetailsV2', function (req, res, next) {
  var songName = req.query.songName;
  var songdetails = "";

  //console.log(songName);
  SongDetails.getSongDetailsByName(songName, function (err, songDetails) {
    //console.log(songDetails);
    if (err) {
      throw err;
    } else {

    }
    res.json(songDetails);
  });
});

router.get('/chordDetailsV2', function (req, res, next) {
  var songName = req.query.songName;
  var chordNames = [];
  //console.log(songName);
  ChordDetails.getChordDetailsByName(songName, function (err, chordDetails) {
    //console.log(songDetails);
    if (err) {
      throw err;
    } else {

      console.log(chordDetails[0].chordDetails.length);

      if (chordDetails[0].chordDetails.length != 0 && chordDetails[0].chordDetails.length > 0) {
        for (var i in chordDetails[0].chordDetails) {
          chordNames.push(chordDetails[0].chordDetails[i].chordname);
        }
      }


      Chords.getChordsByName(chordNames, function (err, songs) {
        //console.log(songDetails);
        if (err) {
          throw err;
        } else {
          console.log(songs);
          res.json(songs);

        }
      });

    }
    // res.json(chordDetails);
  });
});


router.get('/favSongsV2', function (req, res, next) {
  // ..
  var songName = req.query.songName;
  console.log(songName);
  var songlist = [];
  if (songName != "") {
    songlist = songName.split(",");
  }

  Songs.getFavouriteSongs(songlist, function (err, songs) {
    if (err) {
      throw err;
    }
    console.log(songs);
    res.json(songs);
  });
});

router.get('/filterSongsBySongNameV2', function (req, res, next) {
  // ..
  //console.log(req.body);
  var songname = req.query.songName;
  var pageno = req.query.pageNo;

  Songs.getSongsByNamePaginateV2(songname, pageno, function (err, songs) {
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});




router.get('/lastUpdatedSongs', function (req, res, next) {
  Songs.lastUpdatedSongs(function (err, songs) {
    //console.log(songs);
    if (err) {
      throw err;
    }
    res.json(songs);
  });
});




router.post('/submitSongRequest', function (req, res, next) {
  // ..
  //console.log(req.body);
  var songreq = {
    songname: req.body.songname,
    moviename: req.body.moviename,
    status: req.body.status
  }
  //console.log(songreq);
  SongReq.submitRequest(songreq, function (err, songreq) {
    if (err) {
      throw err;
    }
  });
  res.send('ok');
});
// Return router


router.post('/pushtest', function (req, res, next) {



  DeviceDetails.getRegisterTokens(function (err, deviceDetails) {
    if (err) {
      throw err;
    } else {
      if (deviceDetails.length != 0) {
        console.log("register tokens length : " + deviceDetails.length);
        var device_tokens = [];
        for (var i = 0; i < deviceDetails.length; i++) {
          device_tokens.push(deviceDetails[i].device_token);
        }
        console.log("added device tokens length : " + device_tokens.length);

        console.log('Going to  Push');
        var retry_times = 4; //the number of times to retry sending the message if it fails
        var sender = new gcm.Sender('AIzaSyDKZH7Ppvzq6oJfeSxxvwfUm0MCuPi26Lc'); //create a new sender
        var message = new gcm.Message(); //create a new message
        message.addData('title', 'Hey, Checkout, New Songs Added !');
        message.addData('message', 'testsong');
        message.addData('soundname', 'jinglebells');
        message.addData('image', 'icon');
        message.addData('style', 'inbox');
        message.addData('summaryText', 'There are %n% notifications');
        message.addData('notId', Math.random() * 10);

        //message.collapseKey = 'New Songs Added'; //grouping messages
        //message.delayWhileIdle = true; //delay sending while receiving device is offline
        //message.timeToLive = 3; //the number of seconds to keep the message on the server if the device is offline

        /*
        YOUR TODO: add code for fetching device_token from the database
        */
        sender.send(message, device_tokens, function (result) {
          console.log('push sent,,');
        });

        res.send('ok');
      }
    }
  });


  res.send('ok');
});


router.post('/sendPushNotificationV2', function (req, res, next) {
  let message = {};
  var request = req.body.data;
  request = JSON.parse(request);
/*   console.log(" title : " + request.pushTitle);
 */  DeviceDetails.getRegisterTokens(function (err, deviceDetails) {
    if (err) {
      throw err;
    } else {
      if (deviceDetails.length != 0) {
        console.log("register tokens length : " + deviceDetails.length);
        var device_tokens = [];
        for (var i = 0; i < deviceDetails.length; i++) {
          device_tokens.push(deviceDetails[i].device_token);
        }
        console.log("added device tokens length : " + device_tokens.length);

        console.log('Going to  Push');

        if (request.pushType == "button") {
          message = {
            registration_ids: device_tokens,
            data: {
              "title": request.pushTitle,
              "message": request.pushDesc,
              "style": "inbox",
              "summaryText": "There are %n% notifications",
              "soundname": 'jinglebells',
              "notId": Math.random() * 10,
              "image": "icon",
              "image-type": "circular",
              "button": "Y",

            }
          };
        } else {
          message = {
            registration_ids: device_tokens,
            data: {
              "title": request.pushTitle,
              "message": request.pushDesc,
              "style": "inbox",
              "summaryText": "There are %n% notifications",
              "soundname": 'jinglebells',
              "notId": Math.random() * 10,
              "image": "icon",
              "image-type": "circular",
              "button": "N"
            }
          };
        }



        fcm.send(message, (err, response) => {
          if (err) {
            console.log(err);
            console.log("Something has gone wrong!");
          } else {
            console.log("Successfully sent with response: ", response);
          }
        });

        res.send('ok');
      }
    }
  });


  res.send('ok');
});


module.exports = router;