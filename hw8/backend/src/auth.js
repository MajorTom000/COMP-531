var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
var redis = require('redis').createClient('redis://h:p3b356961rets19dnlcdi8jo21@ec2-54-221-241-163.compute-1.amazonaws.com:9939')
const md5 = require('md5')


redis.on("error", function(err){
    console.log("Redis-Error: " +  err)
})

const User = require('./model.js').Users
const Profile = require('./model.js').Profile

const cookieKey = 'sessionid'
let FRONT_END_URL = ''
const FACEBOOK_CLIENT_ID = '1151261394982261'
const FACEBOOK_CLIENT_SECRET = '094ad88035873cb8073ae05c30fe63d8'
const FACEBOOK_CALL_BACK = '/auth/facebook/callback'

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: FACEBOOK_CALL_BACK,
    profileFields: ['id', 'first_name', 'last_name', 'picture', 'email']
    },
    function(accessToken, refreshToken, profile, callback){
        const name = profile.name.givenName + '.' + profile.name.familyName
        User.findOrCreate({username: name}, function(err,user){
            
            Profile.update({username: name}, {username: name, avatar: profile.photos[0].value},{upsert:true}, function(err, result){

                return callback(err, user)
            })
        })
    }
))

passport.serializeUser(function(user, done){
    done(null, user)
})

passport.deserializeUser(function(user, done){
    done(null,user)
})

const facebookCallback = (req, res)=>{

    console.log(req.user)

    const userObj = req.user

    const sessionid = md5((new Date()).getTime + userObj.username)
    res.cookie(cookieKey, sessionid, {maxAge: 3600*1000, httpOnly: true})

    redis.hmset(sessionid, userObj)

    console.log('origin:' + req.headers.origin)

    res.redirect(FRONT_END_URL)
}

const postRegister = (req, res) => {
    if (!req.body.username || !req.body.password){
        res.status(400).send('username and password should be supplied')
        return
    }

    const username = req.body.username
    const password = req.body.password

    const email = req.body.email
    const zipcode = req.body.zipcode
    const dob = new Date(req.body.dob).getTime()
    const headline = 'Wonderful Full Stack Developer'

    User.find({username: username}).exec(function(err, user){
        if (err) {console.log(err)}
        if (user.length > 0){
            res.status(400).send(`${username} already exists`)
            return
        }
        else{
            const newSalt = md5((new Date()).getTime())
            const newUser = new User({username, hash: md5(password + newSalt), salt: newSalt})

            const newProfile = new Profile({username, email, zipcode, dob, headline})

            newProfile.save(function(err, profile){
                if (err){
                    console.log('profile save failed')
                    console.log(err)
                    return
                }

                console.log('profile created for ' + username)
            })

            newUser.save(function(err, user){
                if (err){
                    res.status(400).send(`something went wrong when creating new account : ${username}`)
                }

                console.log('saved successfully')
                res.send({
                    username,
                    status: 'success'
                })
            })
        }
    })

    
}

const postLogin = (req, res) => {
    console.log(req.body.username)
    console.log(req.body.password)

    if (!req.body.username || !req.body.password){
        res.status(401).send('Unauthorized')
        return
    }

    const username = req.body.username
    const password = req.body.password

    User.find({username: username}).exec(function(err, users){
        if (err){
            console.log(err)
            return
        }

        if (users.length == 0){
            res.status(401).send('Unauthorized')
            return
        }

        const userObj = users[0]

        console.log(`user found with name ${username}`)
        

        if (userObj && (md5(password + userObj.salt) === userObj.hash)){

            const sessionid = md5((new Date()).getTime + userObj.username + userObj.hash)
            res.cookie(cookieKey, sessionid, {maxAge: 3600*1000, httpOnly: true})

            redis.hmset(sessionid, userObj)
            console.log('cookie set successfully')

            res.send({username:userObj.username, status:'success'})
        }
        else{
            res.status(401).send('Unauthorized')
            return
        }
    })
}


const putLogout = (req, res) => {

    if (req.sessionid || req.user){
        req.user = null
        redis.del(req.sessionid)
        req.sessionid = null
        
    }
    res.clearCookie(cookieKey)
    res.status(200).send('OK')
}

function isLoggedIn(req, res, next){

    const sid = req.cookies[cookieKey]


    console.log('called isLoggedIn')
    if (!sid){
        res.sendStatus(401)
        return
    }
    else{
        console.log('isLoggedIn else + ' + sid)
        redis.hgetall(sid, function(err, userObj){
            if (err){
                console.log(err)
                res.sendStatus(500)
                return
            }
            
            if(!userObj){
                res.redirect('/login')
                return
            }

            console.log(sid + " mapped to " + userObj.username)

            req.user = userObj.username
            req.sessionid = sid

            return next()
        })
    }
}


const putPassword = (req, res) => {
    
    if (req.body.password){

        User.find({username: req.user}).exec(function(e,u){
            if (e){
                console.log(e)
                res.statusSend(500)
                return
            }

            User.update({username: req.user}, {$set: {hash: md5(req.body.password + u[0].salt)}}, function(err){
                if (err){
                    console.log(err)
                    res.statusSend(500)
                    return
                }
                res.send({username: u[0].username, status: 'success'})
                return
            })
        })
    }
    else{
        res.statusSend(400)
    }

}

const referer = (req, res, next) => {
    if (FRONT_END_URL == ''){
        FRONT_END_URL = req.headers.referer
    }

    console.log(FRONT_END_URL)

    next()
}

module.exports = app => {
    app.use(cookieParser())
    app.use(passport.initialize())
    app.use(passport.session({secret:'sniper'}))
    app.use(referer)
    app.post('/login', postLogin)
    app.post('/register', postRegister)
    app.get('/auth/facebook', passport.authenticate('facebook'))
    app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }), facebookCallback)
    app.use(isLoggedIn)
    app.put('/logout',  putLogout)
    app.put('/password', putPassword)
}