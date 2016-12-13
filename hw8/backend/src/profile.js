const uploadImage = require('./uploadCloudinary.js').uploadImage

const index = (req, res) => {
     res.send({ hello: 'world' })
}


const Profile = require('./model.js').Profile

// var profileSchema = new mongoose.Schema({
// 	username: String,
// 	headline: String,
// 	following: [String],
// 	email: String,
// 	dob: String,
// 	zipcode: String,
// 	avatar: String
// })


const getHeadline = (req, res) => {

	const users = req.params.users ? req.params.users.split(',') : [req.user]

	Profile.find({username : {$in : users}}).exec(function(err, objects){
		if (err){
			console.log(err)
			res.status(400).send('Bad Request')
			return
		}
		console.log(objects.length)
		const headlines = objects.map((v)=>{
			return {username: v.username, headline:v.headline}
		})
		res.send({headlines})
	})
}

const putHeadline = (req, res) => {

	const user = req.user

	Profile.update({username: user}, {$set: {headline: req.body.headline}}, function(err){

		if (err){
			console.log(err)
			return
		}

		Profile.find({username: user}).exec(function(err, objects){
			if (err || objects.length == 0){
				console.log(err)
				res.status(500).send('Internal Server Error')
				return
			}

			res.send({username : objects[0].username, headline: objects[0].headline})
		})
	})

}

const getEmail = (req, res) => {

	const user = req.params.user ? req.params.user : req.user

	Profile.find({username: user}).exec(function(err, objects){
		if (err || objects.length == 0){
			console.log(err)
			res.status(400).send('Bad Request')
			return
		}
		res.send({username : objects[0].username, email: objects[0].email})
	})

}

const putEmail = (req, res) => {
	const user = req.user

	Profile.update({username: user}, {$set: {email: req.body.email}}, function(err){

		if (err){
			console.log(err)
			return
		}

		Profile.find({username: user}).exec(function(err, objects){
			if (err || objects.length == 0){
				console.log(err)
				res.status(500).send('Internal Server Error')
				return
			}

			res.send({username : objects[0].username, email: objects[0].email})
		})
	})
}

const getZipcode = (req, res) => {
	const user = req.params.user ? req.params.user : req.user

	Profile.find({username: user}).exec(function(err, objects){
		if (err || objects.length == 0){
			console.log(err)
			res.status(400).send('Bad Request')
			return
		}
		res.send({username : objects[0].username, zipcode: objects[0].zipcode})
	})
}

const putZipcode = (req, res) => {
	const user = req.user

	Profile.update({username: user}, {$set: {zipcode: req.body.zipcode}}, function(err){

		if (err){
			console.log(err)
			return
		}

		Profile.find({username: user}).exec(function(err, objects){
			if (err || objects.length == 0){
				console.log(err)
				res.status(500).send('Internal Server Error')
				return
			}

			res.send({username : objects[0].username, zipcode: objects[0].zipcode})
		})
	})
}


const getDob = (req, res) =>{
	const user = req.params.user ? req.params.user : req.user

	Profile.find({username: user}).exec(function(err, objects){
		if (err || objects.length == 0){
			console.log(err)
			res.status(400).send('Bad Request')
			return
		}
		res.send({username : objects[0].username, dob: objects[0].dob})
	})
}

const getAvatars = (req, res) => {

	const users = req.params.user ? req.params.user.split(',') : [req.user]
	Profile.find({username : {$in : users}}).exec(function(err, objects){
		if (err){
			console.log(err)
			res.status(400).send('Bad Request')
			return
		}
		console.log(objects.length)
		const avatars = objects.map((v)=>{
			return {username: v.username, avatar:v.avatar}
		})
		res.send({avatars})
	})
}

const putAvatars = (req, res) => {
	const user = req.user

	const avatar = req.fileurl

	Profile.update({username: user}, {$set: {avatar}}, function(err){

		if (err){
			console.log(err)
			return
		}

		Profile.find({username: user}).exec(function(err, objects){
			if (err || objects.length == 0){
				console.log(err)
				res.status(500).send('Internal Server Error')
				return
			}
			
			res.send({username : objects[0].username, avatar: objects[0].avatar})
		})
	})
}


module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:users?', getHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
	 app.get('/dob',getDob)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', uploadImage('avatar'), putAvatars)
}