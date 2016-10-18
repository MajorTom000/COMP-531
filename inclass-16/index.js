const express = require('express')
const bodyParser = require('body-parser')


listArticles = {
    articles:[
        {"id":1, "author":"Person1", "text":"Text1"},
        {"id":2, "author":"Person2", "text":"Text2"},
        {"id":3, "author":"Person3", "text":"Text3"}
    ]
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)  
     let id = listArticles.articles[listArticles.articles.length-1]["id"] +1
     listArticles.articles = [...listArticles.articles, {"id":id, "author": "Test", "text":req.body["body"]}] 
     res.send(listArticles.articles[listArticles.articles.length-1])
}

const getArticle = (req, res) =>{
    res.send(JSON.stringify(listArticles))
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})