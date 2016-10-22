const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadline = (req, res) => {
	res.send({headlines:[
	{username: 'Someone1', headline: 'Someone1 headline'},
	{username: 'Someone2', headline: 'Someone2 headline'},
	{username: 'Someone3', headline: 'Someone3 headline'}
	]})
}

const putHeadline = (req, res) => {
	res.send({headlines:[{
		username: 'Neil',
		headline: req.body.headline || 'you did not supply headline'
		}]})
}

const getEmail = (req, res) => {
	res.send({username: 'someone1', email: 'someone1@somebody.net'})
}

const putEmail = (req, res) => {
	res.send({
		username: 'Someone1',
		email: req.body.email || 'you did not supply email'
		})
}

const getZipcode = (req, res) => {
	res.send({username: 'Someone1', zipcode: '12345'})
}

const putZipcode = (req, res) => {
	res.send({
		username: 'Someone1',
		zipcode: req.body.zipcode || 'you did not supply zipcode'
		})
}

const getAvatars = (req, res) => {
	res.send({avatars:[
	{username: 'Someone1', avatar: 'Someurl1'},
	{username: 'Someone2', avatar: 'Someurl2'},
	{username: 'Someone3', avatar: 'Someurl3'}
	]})
}

const putAvatars = (req, res) => {
	res.send({
		username: 'Someone1',
		headline: req.body.img || 'you did not supply file'
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
     app.get('/avatars/:users?', getAvatars)
     app.put('/avatar', putAvatars)
}