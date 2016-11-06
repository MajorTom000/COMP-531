const articles = {
    articles:{
            "1":{id: 1, text:"sample1", author:"sample1",date:new Date(), comment:[]},
            "2":{id: 2, text:"sample2", author:"sample2",date:new Date(), comment:[]},
            "3":{id: 3,text:"sample3", author:"sample3",date:new Date(), comment:[]},
            "4":{id: 4,text:"sample3", author:"sample4",date:new Date(), comment:[]}
    },
    nextID: 5
}


const addArticle = (req, res) =>{
    var id = articles.nextID
    articles.nextID++

    var newArticle ={}

    newArticle.id = id

    newArticle.text = (req.body.text || 'blank')
    newArticle.author = (req.body.author || 'unknown')
    newArticle.date = new Date()
    newArticle.comment = []
    articles.articles[newArticle.id] = newArticle
    res.send({articles : [newArticle]})

}

const editArticle = (req, res) =>{

    console.log(req.params.id)

    articles.articles[req.params.id].text = req.body.text

    res.send({articles: articles.articles[req.params.id]})
}

const returnArticle = (req, res)=>{
    if (req.params.id){
        res.send({articles:[articles.articles[req.params.id]]})
    }
    else{

        const return_articles = Object.keys(articles.articles).map((v)=>{
            return articles.articles[v]
        })
        res.send({articles:return_articles})
    }
}


module.exports = (app) =>{
    app.get('/articles/:id?', returnArticle)
    app.put('/articles/:id', editArticle)
    app.post('/article', addArticle)
}