const index = (req, res) => {
     res.send({ hello: 'world' })
}

const profile = {
	profile: {
		'sampleUser' :{
			email:'sample@email.com',
			zipcode: 12345,
			avatar: 'sampleAvatar',
			dob: (new Date('11/11/1911')).toDateString()
		},
		'qw12':{
			email:'qw12@rice.edu',
			zipcode: 12345,
			avatar: 'someavatar',
			dob: (new Date('01/01/1990')).toDateString()
		},
		'other1':{
			email:'other1@ab.c',
			zipcode: 23456,
			avatar: 'other1avatar',
			dob: (new Date('01/01/1991')).toDateString()
		},
		'other2':{
			email:'other2@ab.c',
			zipcode: 23456,
			avatar: 'other2avatar',
			dob: (new Date('01/01/1992')).toDateString()
		}
	},

	headlines:{
		'sampleUser':'Sample Headline',
		'qw12':'this is my headline',
		'other1': 'this is not mine',
		'other2' : 'this is not mine either'
	}
}



const getHeadline = (req, res) => {

	if (!req.user) req.user = 'qw12'

	const users = req.params.users ? req.params.users.split(',') : [req.user]

	const headlines = users.map((v)=>{
		return {
			username: v,
			headline: profile.headlines[v]
		}
	})

	res.send({headlines})
}

const putHeadline = (req, res) => {

	if (!req.user) req.user = 'qw12'

	profile.headlines[req.user] = req.body.headline

	res.send({username: req.user, headline: profile.headlines[req.user]})
}

const getEmail = (req, res) => {
	if (!req.user) req.user = 'qw12'

	const user = req.params.user ? req.params.user : req.user

	res.send({
		username: user,
		email: profile.profile[user].email	
	})
}

const putEmail = (req, res) => {
	if (!req.user) req.user = 'qw12'

	profile.profile[req.user].email = req.body.email

	res.send({username: req.user, email: profile.profile[req.user].email})
}

const getZipcode = (req, res) => {
	if (!req.user) req.user = 'qw12'

	const user = req.params.user ? req.params.user : req.user

	res.send({
		username: user,
		zipcode: profile.profile[user].zipcode	
	})
}

const putZipcode = (req, res) => {
	if (!req.user) req.user = 'qw12'

	profile.profile[req.user].zipcode = parseInt(req.body.zipcode)

	res.send({username: req.user, zipcode: profile.profile[req.user].zipcode})
}


const getDob = (req, res) =>{
	if (!req.user) req.user = 'qw12'

	const user = req.user 
	res.send({
		username: user,
		dob: profile.profile[user].dob	
	})
}

//TODO: FIX THIS END-POINT
const getAvatars = (req, res) => {
	if (!req.user) req.user = 'qw12'

	const user = req.params.user ? req.params.user : req.user

	res.send({
		username: user,
		avatar: profile.profile[user].avatar	
	})
}

const putAvatars = (req, res) => {
	if (!req.user) req.user = 'qw12'

	profile.profile[req.user].avatar = req.body.img

	res.send({username: req.user, avatar: profile.profile[req.user].avatar})
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
     app.put('/avatar', putAvatars)
}