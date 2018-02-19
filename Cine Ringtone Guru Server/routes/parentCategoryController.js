var express = require('express');
let fs = require('fs');
let constants = require('../constants');
var router = express.Router();
ParentCategory = require('../models/parentCategory');
SubCategory = require('../models/subCategory');
DeviceDetails = require('../models/devicePushDetails');
var gcm = require('node-gcm');
var device_token;

router.use(function (req, res, next) {
    // .. some logic here .. like any other middleware
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUTDELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,ringtonename,categoryName,pushTitle,pushImage,pushMessage,imageName");
    next();
});
router.post('/createParentCategory', function (req, res, next) {
    var parentCategory = req.body;
    //parentCategory = JSON.parse(parentCategory);
    //console.log(parentCategory);
    ParentCategory.createCategory(parentCategory, function (err, parentCategory) {
        if (err) {
            throw err;
        } else {
            CategoryFilesys.CreateCategoryFolder(parentCategory.categoryName);
        }
        res.json(parentCategory);
    });
    res.send('ok');
});

router.post('/createSubCategory', function (req, res, next) {
    var subCategory = req.body;
    //parentCategory = JSON.parse(parentCategory);
    //console.log(parentCategory);
    SubCategory.createSubCategory(subCategory, function (err, subCategory) {
        if (err) {
            throw err;
        } else {
            CategoryFilesys.CreateCategoryFolder(subCategory.categoryName + constants.separator +
                subCategory.subCategoryName);
            res.send('ok');

        }

    });
    //res.send('ok');
});

router.get('/fetchParentCategory', function (req, res, next) {
    ParentCategory.getCategory(function (err, parentCategory) {
        if (err) {
            throw err;
        } else {

        }
        res.json(parentCategory);
    });
});

router.get('/fetchSubCategory', function (req, res, next) {
    let categoryName = req.query.categoryName;
    console.log(categoryName);
    SubCategory.getSubCategory(categoryName, function (err, subCategory) {
        if (err) {
            throw err;
        } else {

        }
        //console.log(subCategory);
        res.json(subCategory);
    });
});

router.post('/deleteParentCategory', function (req, res, next) {
    var categoryId = req.body.categoryId;
    var categoryName = req.body.categoryName;

    ParentCategory.deleteCategory(categoryId, function (err) {
        if (err) {
            throw err;
        } else {
            CategoryFilesys.DeleteCategoryFolder(categoryName);
            res.send("ok");
        }
    });
});

router.post('/deleteSubCategory', function (req, res, next) {
    var categoryId = req.body.categoryId;
    var categoryName = req.body.categoryName;
    var subCategoryName = req.body.subCategoryName;


    SubCategory.deleteSubCategory(categoryId, function (err) {
        if (err) {
            throw err;
        } else {
            CategoryFilesys.DeleteCategoryFolder(categoryName + constants.separator +
                subCategoryName);
            res.send("ok");
        }
    });
});

var CategoryFilesys = module.exports = {
    CreateCategoryFolder: function (categoryName) {
        var dir = constants.httpServerRootpath + categoryName;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            console.log("Directory created");
        } else {
            console.log("Directory already exist");
        }
    },

    DeleteCategoryFolder: function (categoryName) {
        var dir = constants.httpServerRootpath + categoryName;
        if (fs.existsSync(dir)) {
            fs.rmdir(dir);
            console.log("Directory Destroyed");
        } else {
            console.log("Directory doesn't exist");
        }
    }
}


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
                var sender = new gcm.Sender('AAAA0zHrFi0:APA91bHbtNDzw__5-ysdcWIzFjSa9iLYn7WFgryXHA_hAT1fYefutbz1H9Bk43kr4Vs23uXiDM6rddAbWclcPv2hgWEPd4PB7Z20sYSyHOaYexjiMLQYxjNj3MpimBuQ7vp7i0yQQ_zw'); //create a new sender
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




module.exports = router;