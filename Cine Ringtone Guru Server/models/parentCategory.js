var mongoose = require('mongoose');

// languageCategory Schema
var parentCategory = mongoose.Schema({
	categoryName: {
		type: String,
		required: true
	},
	categoryImage: {
		type: String,
		required: true
	},
	categoryDescription: {
		type: String,
		required: true
	},
	head: {
		type: String,
		required: true
	}

});

var ParentCategory = module.exports = mongoose.model('ParentCategory', parentCategory);



// Create New Parent Category
module.exports.createCategory = function (category, callback) {
	ParentCategory.create(category, callback);
}

// Get Parent Categories
module.exports.getCategory = function (callback, limit) {
	ParentCategory.find(callback).limit(limit);
}

module.exports.deleteCategory = function (id, callback) {
	ParentCategory.find({ _id: id }).remove(callback);
}


