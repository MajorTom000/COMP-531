// this is model.js 
var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')
require('./db.js')

var commentSchema = new mongoose.Schema({
	commentId: String,
	author: String,
	date: Date, 
	text: String
	},	
	{
		_id:false
	}
)

var articleSchema = new mongoose.Schema({
	_id: String,
	author: String, 
	img: String, 
	date: Date,
	text: String,
	comments: [ commentSchema ]
})

var userSchema = new mongoose.Schema({
	username: String, 
	hash:String, 
	salt:String
})

var profileSchema = new mongoose.Schema({
	username: String,
	headline: String,
	following: [String],
	email: String,
	dob: String,
	zipcode: String,
	avatar: String
})

userSchema.plugin(findOrCreate);

exports.Article = mongoose.model('articles', articleSchema)
exports.Profile = mongoose.model('profile', profileSchema)
exports.Users = mongoose.model('users', userSchema)
exports.Comments = mongoose.model('comments', commentSchema)