import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {editArticle} from './articleActions'

var ContentEditable = require('react-contenteditable')

class Comment extends React.Component {


    constructor(props){
        super(props)
        this.newMessage = ''
    }

    render() {
        return (
                <li className = "collection-item">
                    <p><img className="circle comment" src={this.props.avatar}/> {this.props.author} {this.props.date}</p>
                    <ContentEditable
                        html = {this.props.text}
                        disabled = {this.props.username != this.props.author}
                        onChange = {(e)=>{this.newMessage = e.target.value}}
                    />
                    {this.props.username != this.props.author ? '' : <button className="btn" onClick={()=>{this.props.dispatch(editArticle(this.props.articleId, this.newMessage, this.props._id)) 
                        this.forceUpdate()}}><i className="material-icons">done</i></button>}
                </li>
        )
    }
}



Comment.propTypes = {
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string
}

export default connect()(Comment)