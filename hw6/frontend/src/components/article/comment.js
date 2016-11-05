import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {editArticle} from './articleActions'

var ContentEditable = require('react-contenteditable')

export const Comment = ({dispatch, username, commentId, author, date, text, avatar, _id, articleId}) => {


    let newMessage

    return (
            <li className = "collection-item">
                <p><img className="circle comment" src={avatar}/> {author} {date}</p>
                <ContentEditable
                    html = {text}
                    disabled = {username != author}
                    onChange = {(e)=>{newMessage = e.target.value}}
                />
                {username != author ? '' : <button className="btn" onClick={()=>dispatch(editArticle(articleId, newMessage, _id))}><i className="material-icons">done</i></button>}
            </li>
    )
}



Comment.propTypes = {
    _id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    articleId: PropTypes.number.isRequired
}

export default connect()(Comment)