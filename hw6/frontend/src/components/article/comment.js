import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const Comment = ({username, commentId, author, date, text, avatar}) => {




    return (
        <ul className = "collection">
            <li className = "collection-item">
                <p><img className="circle comment" src={avatar}/> {author} {date}</p>
                <p contentEditable={username == author}>{text}</p>
            </li>
        </ul>
    )
}



Comment.propTypes = {
    _id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string
}

export default connect()(Comment)