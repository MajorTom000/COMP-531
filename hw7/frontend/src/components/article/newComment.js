import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {addArticle, editArticle} from './articleActions'

export const NewComment = ({dispatch, articleId})=> {

    let message



    return (
        <li className="collection-item">
            <textarea ref={node=>message=node}/>
            <button className="btn" onClick={()=>dispatch(editArticle(articleId, message.value, -1))}><i className="material-icons">input</i></button>
        </li>
    )  
}




export default connect()(NewComment)