import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {MakeComment, EditArticle} from './articleActions'

import Comment from './comment'

export const Article = React.createClass ({
            componentWillMount: function(){
                this.hideComment = true
            },

            render:function(){
                    return (
                    <div className="row">
                        <div className="col s12 m12">
                            <div className="card grey lighten-2">
                                <div className="card-image">
                                    <img src={this.props.image}/>
                                </div>
                                <div className="card-content black-text">
                                    <span className="card-titile">{this.props.date}, {this.props.author}</span>
                                    <p>
                                        {this.props.text}
                                    </p>
                                </div>
                                <div className="card-action">
                                    <button className="waves-effect waves-black btn-flat" onClick={()=>{this.hideComment = !this.hideComment
                                        this.forceUpdate()}}>Comments</button>
                                    { this.props.username == this.props.author ? 
                                        <button className="waves-effect waves-black btn-flat" >Edit</button> : ''
                                    }
                                </div>
                            </div>
                            {   this.hideComment ? '' :this.props.comments.sort((x,y)=>{
                                    return x.date < y.date ? 1 : x.date > y.date ? -1 : 0;
                                }).map((comment)=>
                                    <Comment key={comment.commentId} _id = {comment.commentId} author={comment.author} date={comment.date}
                                    text={comment.text} avatar={comment.avatar} username={this.props.author}/> 
                                )
                            }
                        </div>
                    </div>
                )
            }
})


Article.PropTypes = {
    _id: PropTypes.number.isRequired,
    date: PropTypes.string,
    author: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.shape({
        ...Comment.propTypes
    }).isRequired).isRequired
}

export default connect()(Article)