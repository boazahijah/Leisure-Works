var express = require('express');

let fs = require('fs');
let constants = require('../constants');
RingTone = require('../models/ringTone');
DeviceDetails = require('../models/devicePushDetails');
var gcm = require('node-gcm');
var FCM = require('fcm-node');

const apiKey = "AAAA0zHrFi0:APA91bHbtNDzw__5-ysdcWIzFjSa9iLYn7WFgryXHA_hAT1fYefutbz1H9Bk43kr4Vs23uXiDM6rddAbWclcPv2hgWEPd4PB7Z20sYSyHOaYexjiMLQYxjNj3MpimBuQ7vp7i0yQQ_zw";
const fcm = new FCM(apiKey);

var device_token;
var multer = require('multer')
var router = express.Router();



var app = express();


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, constants.httpServerRootpath + req.get('categoryName')
            + constants.separator + req.get("subCategoryName"))
    },
    filename: function (req, file, cb) {
        cb(null, req.get('ringtonename'))
    }
})

var storagePush = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, constants.httpServerRootpath + "pushimages")
    },
    filename: function (req, file, cb) {
        cb(null, req.get('imageName'))
    }
})

var uploadPush = multer({
    storage: storagePush
}).single('pushImage');

var upload = multer({
    storage: storage
}).single('RingTone');

router.use(function (req, res, next) {
    // .. some logic here .. like any other middleware
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUTDELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,ringtonename,categoryName,subCategoryName,ringKeyWords,pushTitle,pushImage,pushMessage,imageName");
    next();
});

router.post('/saveRingTone', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
        } else {
            var ringTone = {
                'categoryName': req.get('categoryName'),
                'subCategoryName': req.get('subCategoryName'),
                'ringToneName': req.get('ringtonename'),
                'serverPath': constants.httpServerURL + req.get('categoryName') + constants.separator +
                req.get('subCategoryName') + constants.separator + req.get('ringtonename'),
                'ringKeyWords': req.get('ringKeyWords'),
                'createdDate': Date.now(),
                'hits': 0
            }

            RingTone.saveRingTone(ringTone, function (err, ringTone) {
                if (err) {
                    throw err;
                } else {
                    res.send('ok');

                }
            });
        }


    })
});
router.get('/fetchRingTone', function (req, res, next) {
    // ..
    var categoryName = req.query.categoryName;
    RingTone.getRingTonesByCategoryName(categoryName, function (err, ringTones) {
        if (err) {
            throw err;
        } else {
            // res.json(ringTones);
        }
        res.json(ringTones);
    });

});


router.get('/fetchRingTonePaginate', function (req, res, next) {
    var categoryName = req.query.categoryName;
    var subCategoryName = req.query.subCategoryName;

    var pageNo = req.query.pageNo;
    var searchInput = req.query.searchInput;
    console.log(pageNo);
    console.log(categoryName);
    console.log(subCategoryName);
    console.log(searchInput);
    RingTone.fetchRingTonePaginate(categoryName, subCategoryName, pageNo, searchInput, function (err, ringTones) {
        if (err) {
            throw err;
        } else {
            // res.json(ringTones);d
        }
        // console.log(ringTones);
        res.json(ringTones);
    });

});

router.get('/fetchRingTonePaginateAllCat', function (req, res, next) {
    /*  var categoryName = req.query.categoryName;
     var subCategoryName = req.query.subCategoryName;
  */
    var pageNo = req.query.pageNo;
    var searchInput = req.query.searchInput;
    console.log(pageNo);
    /*  console.log(categoryName);
     console.log(subCategoryName); */
    console.log(searchInput);
    RingTone.fetchRingTonePaginateAllCat(pageNo, searchInput, function (err, ringTones) {
        if (err) {
            throw err;
        } else {
            // res.json(ringTones);d
        }
        //  console.log(ringTones);
        res.json(ringTones);
    });

});


/* router.post('/pushNotify', function (req, res, next) {
    // ..
    uploadPush(req, res, function (err) {
        if (err) {
            console.log(err);
        } else {

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
                        var sender = new gcm.Sender('AAAA0zHrFi0:APA91bHbtNDzw__5-ysdcWIzFjSa9iLYn7WFgryXHA_hAT1fYefutbz1H9Bk43kr4Vs23uXiDM6rddAbWclcPv2hgWEPd4PB7Z20sYSyHOaYexjiMLQYxjNj3MpimBuQ7vp7i0yQQ_zw'); //create a new sender
                        var message = new gcm.Message(); //create a new message
                        message.addData('title', req.get('pushTitle'));
                        message.addData('message', req.get('pushMessage'));
                        message.addData('soundname', 'jinglebells');
                        message.addData('image', 'icon');
                        message.addData('image-type', 'circular');

                        message.addData('style', 'picture');
                        message.addData('picture', constants.httpServerURL + "pushimages" +
                            constants.separator + req.get('imageName'));
                        message.addData('summaryText', 'There are %n% notifications');
                        message.addData('notId', Math.random() * 10);

                       
                        console.log(constants.httpServerURL + "pushimages" +
                            constants.separator + req.get('imageName'));
                        sender.send(message, device_tokens, function (result) {
                            console.log('push sent,,');
                        });

                        res.send('ok');
                    }
                }
            });
        }
    })
    res.send('ok');
}); */


router.post('/pushNotify', function (req, res, next) {
    // ..
    uploadPush(req, res, function (err) {
        if (err) {
            console.log(err);
        } else {

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
                        /* var retry_times = 4; //the number of times to retry sending the message if it fails
                        var sender = new gcm.Sender('AAAA0zHrFi0:APA91bHbtNDzw__5-ysdcWIzFjSa9iLYn7WFgryXHA_hAT1fYefutbz1H9Bk43kr4Vs23uXiDM6rddAbWclcPv2hgWEPd4PB7Z20sYSyHOaYexjiMLQYxjNj3MpimBuQ7vp7i0yQQ_zw'); //create a new sender
                        var message = new gcm.Message(); //create a new message
                        message.addData('title', req.get('pushTitle'));
                        message.addData('message', req.get('pushMessage'));
                        message.addData('soundname', 'jinglebells');
                        message.addData('image', 'icon');
                        message.addData('image-type', 'circular');

                        message.addData('style', 'picture');
                        message.addData('picture', constants.httpServerURL + "pushimages" +
                            constants.separator + req.get('imageName'));
                        message.addData('summaryText', 'There are %n% notifications');
                        message.addData('notId', Math.random() * 10); */

                        const message = {
                            registration_ids: device_tokens,
                            data: {
                                "title": req.get('pushTitle'),
                                "message": req.get('pushMessage'),
                                "style": "inbox",
                                "summaryText": "There are %n% notifications",
                                "soundname": 'test',
                                "notId": Math.random() * 10,
                                "image": "icon",
                                "image-type": "circular"



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
    })
    res.send('ok');
});

module.exports = router;