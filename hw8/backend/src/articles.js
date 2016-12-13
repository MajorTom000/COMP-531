// var articleSchema = new mongoose.Schema({
// 	author: String, 
// 	img: String, 
// 	date: String,
// 	text: String,
// 	comments: [ commentSchema ]
// })

const Article = require('./model.js').Article
const Profile = require('./model.js').Profile
const Comments = require('./model.js').Comments
const ObjectId = require('mongodb').ObjectId

const uploadImage = require('./uploadCloudinary.js').uploadImage


const addArticle = (req, res) =>{

    const id = (new ObjectId()).toHexString()
    const text = req.body.text
    const img = req.fileurl

    var newArticle = new Article({_id: id ,author:req.user, date: new Date(), text, img, comments:[]})

    newArticle.save(function(err){
        if (err){
            console.log(err)
            res.status(500).send('Internal Server Error')
            return
        }

        Article.find({_id: id}).exec(function(err, objects){
            if (err || objects.length == 0){
                console.log(err)
                res.status(500).send('Internal Sever Error')
                return
            }

            const art = objects[0]

            res.send({articles: [art]})
        })
    })
}

const editArticle = (req, res) =>{

    Article.find({_id: req.params.id}).exec(function(err, articles){

        if (err || articles.length == 0){
            console.log(err)
            res.status(400).send('Bad Request')
            return
        }

        if (req.body.commentId){
            if (req.body.commentId == -1){
                const newcommentid = (new ObjectId()).toHexString()
                const newcomment = new Comments({commentId: newcommentid, author:req.user, date: new Date(), text: req.body.text})

                var c = articles[0].comments
                c.push(newcomment)

                Article.update({_id: articles[0]._id}, {$set: {comments: c}}, function(ex){
                    if (ex){
                        console.log(ex)
                        res.status(500).send('Internal Server Error')
                        return
                    }

                    Article.find({_id: req.params.id}).exec(function(exception, docs){
                        res.send({articles: [docs[0]]});
                        return;
                    })
                })
            }
            else{
                
                Article.update({_id: articles[0]._id, 'comments.commentId' : req.body.commentId}, {$set: {'comments.$.text':req.body.text}}, function(ex){
                    if (ex){
                        console.log(ex)
                        res.status(500).send('Internal Sever Error')
                        return
                    }

                    Article.find({_id: articles[0]._id}).exec(function(e,o){
                        if(e){
                            console.log(e)
                            res.status(500).send('Internal Server Error')
                            return
                        }

                        res.send({articles: [o[0]]})
                        return
                    })
                })
            }
        }
        else{
            Article.update({_id: articles[0]._id}, {$set: {text : req.body.text}}, function(ex){
                if (ex){
                    console.log(ex)
                    res.status(500).send('Internal Server Error')
                    return
                }

                Article.find({_id: articles[0]._id}).exec(function(e,o){
                    if(e){
                        console.log(e)
                        res.status(500).send('Internal Server Error')
                        return
                    }

                    res.send({articles: [o[0]]})
                })
            })
        }


    })
    
}


const returnUserFeed = (req, res, username) => {
    Profile.find({username}).exec(function(err,objects){
        if (err || objects.length == 0){
            console.log(err)
            res.status(500).send('Internal Server Error')
            return
        }

        var users = objects[0].following
        users.push(objects[0].username)

        Article.find({author: {$in : users}}).sort('-date').limit(10).exec(function(e, docs){
            if (e){
                console.log(err)
                res.status(500).send('Internal Server Error')
                return
            }

            res.send({articles: docs})
            return
        })

    })
}

const returnArticle = (req, res)=>{
    
    if (req.params.id){
        Article.find({_id: req.params.id}).exec(function(err,objects){
            if (err){
                console.log(err)
                res.status(400).send('Bad Request')
                return
            }

            if (objects.length > 0){
                res.send({articles:[objects[0]]})
                return
            }
            else{
                Article.find({author: req.params.id}).exec(function(e, objects){
                    if (e){
                        console.log(e)
                        res.status(400).send('Bad Request')
                        return
                    }

                    if (objects.length > 0){
                        res.send({articles: objects})
                        return
                    }
                    else{
                        returnUserFeed(req,res,req.user)
                    }
                })
            }
        })
    }
    else{
        returnUserFeed(req,res,req.user)
    }
}


module.exports = (app) =>{
    app.get('/articles/:id*?', returnArticle)
    app.put('/articles/:id', editArticle)
    app.post('/article', uploadImage('article'), addArticle)
}