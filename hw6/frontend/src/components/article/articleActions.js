import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {resource} from '../../actions'


export function fetchArticles(){
    return (dispatch, getState) => {
        resource('GET', 'articles')
        .then((response)=>{
            const articles = response.articles.reduce((o,v) => {
                o[v._id] = v
                return o
            }, {})

            dispatch({type: 'UPDATE_ARTICLES', articles})

            const avatars = getState().articles.avatars
            const authors = new Set(response.articles.reduce((o, article)=>{
                article.comments.map((c)=>c.author).forEach((author)=>o.push(author))
                return o
            }, []). filter((author)=>!avatars[author]))

            if (authors.size > 0){
                resource('GET',`avatars/${[...authors].join(',')}`)
                .then((response)=>{
                    response.avatars.forEach((s) => {
                        avatars[s.username] = s.avatar
                    })
                    dispatch({type:'UPDATE_AVATARS', avatars})
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export function searchKeyword(keyword){
    return {type:'SEARCH_BY_KEYWORD', keyword}
}

export function addArticle(message, file){
    if (message == '') return {type:''};

    return (dispatch) => {
        const fd = new FormData()

        fd.append('text', message)
        fd.append('image',file)

        resource('POST','article',fd,false)
        .then((response)=>{
            const article = response.articles[0]
            dispatch({type:'ADD_ARTICLE', article})
            dispatch({type:'ON_SUCCESS', success:'New Artile Posted'})
        })

        
    }

}

export function editArticle(articleId, message, commentId){
    return (dispatch) => {
        const payload = {text : message}
        if (commentId) payload.commentId = commentId
        resource('PUT', `articles/${articleId}`, payload)
        .then((response)=>{
            const article = response.articles[0]
            dispatch({type:'EDIT_ARTICLE',article})
            dispatch({type:'ON_SUCCESS', success:'Edited successfully'})
        })
    }
}