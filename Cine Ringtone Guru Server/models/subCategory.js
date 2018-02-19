var mongoose = require('mongoose');

// languageCategory Schema
var subCategory = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    subCategoryName: {
        type: String,
        required: true
    },
    subCategoryImage: {
        type: String,
        required: true
    },
    subCategoryDescription: {
        type: String,
        required: true
    }

});

var SubCategory = module.exports = mongoose.model('SubCategory', subCategory);



// Create New Parent Category
module.exports.createSubCategory = function (category, callback) {
    SubCategory.create(category, callback);
}

// Get Parent Categories
module.exports.getSubCategory = function (categoryName, callback) {
    SubCategory.find({ 'categoryName': categoryName }, callback);
    //SubCategory.find(callback).limit(limit);
}

module.exports.deleteSubCategory = function (id, callback) {
    SubCategory.find({ _id: id }).remove(callback);
}


