const md5 = require('md5')

var redis = require('redis').createClient()



const password = 'SamplePassword123'

const salt = md5('11/03/2016')

const Users = {
    'qw12':{
        username: 'qw12',
        hash: (md5(password + salt)),
        salt: salt
    }
}


const addUser = (username, password) => {
    const newSalt = md5((new Date()).getTime())
    Users[username] = {username, hash: md5(password + newSalt), salt: newSalt}
}

const postRegister = (req, res) => {
    if (!req.body.username || !req.body.password){
        res.status(400).send('username and password should be supplied')
        return
    }

    if (Users[req.body.username]){
        res.status(400).send('user already exists')
        return
    }

    addUser(req.body.username, req.body.password)

    res.send({
        username: Users[req.body.username].username,
        status: 'success'
    })
}

const postLogin = (req, res) => {
    if (!req.body.username || !req.body.password){
        res.status(401).send('Unauthorized')
        return
    }

    const userObj = Users[req.body.username]

    if (userObj && md5(req.body.password + userObj.salt) == userObj.hash){

        const rand = Math.random()
        const now = new Date()
        const sessionid = md5(now.getTime() * rand)

        redis.hmset(sessionid, userObj)

        res.cookie('sid', sessionid, {maxAge: 3600*1000, httpOnly:true})
        res.send({username:userObj.username, status:'success'})
    }
    else{
        res.status(401).send('Unauthorized')
        return
    }
}


const isLoggedIn = (req, res, next) => {
    const cookie = req.cookies['sid']

    if (!cookie){
        res.redirect('/login')
    }
    else{
        redis.hgetall(cookie, function(err, userObj){
            console.log(sid + 'mapped to ' + userObj)
            if(userObj){
                next()
            }
            else{
                res.redirect('/login')
            }
        })
    }
}

const logout => (req, res){
    res.status(200).send('OK')
}


//only stub, without *real* authentication
const stubLogin = (req,res) => {

    if (!req.body.username || !req.body.password){
        res.status(401).send('Unauthorized')
        return
    }

    res.send({username:req.body.username, status:'success'})
}


module.exports = app => {
    app.post('/login', stubLogin)
    app.get('/logout', logout)
    app.post('/register', postRegister)
}