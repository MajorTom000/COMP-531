const express = require('express')
const bodyParser = require('body-parser')
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').load()
}

//const cors = require('cors')

const app = express()



const corsMiddleware = (req, res, next) => {
    
    res.header('Access-Control-Allow-Origin',req.headers.origin)
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers','Authorization, Content-Type')
    if (req.method == 'OPTIONS')
    {
        res.sendStatus(200)
    }
    else{
        next()
    }
}



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(corsMiddleware)
require('./src/auth')(app)
require('./src/profile')(app)
require('./src/articles')(app)
require('./src/following')(app)




// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})