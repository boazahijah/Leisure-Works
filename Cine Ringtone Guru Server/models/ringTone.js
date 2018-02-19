var mongoose = require('mongoose');

// languageCategory Schema
var ringTone = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    subCategoryName: {
        type: String,
        required: true
    },
    ringToneName: {
        type: String,
        required: true
    },
    serverPath: {
        type: String,
        required: true
    },
    ringKeyWords: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    hits: {
        type: Number,
        required: true
    }

});

var RingTone = module.exports = mongoose.model('RingTone', ringTone);



module.exports.saveRingTone = function (category, callback) {
    RingTone.create(category, callback);
}

module.exports.getRingTonesByCategoryName = function (categoryName, callback) {
    RingTone.find({ 'categoryName': categoryName }, callback).limit(5);
}

module.exports.fetchRingTonePaginate = function (categoryName, subCategoryName, pageNo, searchInput, callback) {
    var query = {};
	/* var regex_songname;
    var regex_songkey; */
    var regex_searchinput;

    var limit = 10;
    var skip = (pageNo - 1) * limit;
    var sort = {
        'skip': skip, // Starting Row
        'limit': limit, // Ending Row
        'sort': {
            ringToneName: 1 //Sort by Date Added DESC
        }
    }

    query.categoryName = categoryName;
    query.subCategoryName = subCategoryName;

    if (searchInput != "") {
        regex_searchinput = new RegExp(searchInput, "i");
        query.ringKeyWords = regex_searchinput;
        // query.ringToneName = regex_searchinput;
    }
    RingTone.find(query, null, sort, callback).limit(limit);
}

module.exports.fetchRingTonePaginateAllCat = function (pageNo, searchInput, callback) {
    var query = {};
	/* var regex_songname;
    var regex_songkey; */
    var regex_searchinput;

    var limit = 10;
    var skip = (pageNo - 1) * limit;
    var sort = {
        'skip': skip, // Starting Row
        'limit': limit, // Ending Row
        'sort': {
            ringToneName: 1 //Sort by Date Added DESC
        }
    }

    if (searchInput != "") {
        regex_searchinput = new RegExp(searchInput, "i");
        query.ringKeyWords = regex_searchinput;
        // query.ringToneName = regex_searchinput;
    }
    RingTone.find(query, null, sort, callback).limit(limit);
}




