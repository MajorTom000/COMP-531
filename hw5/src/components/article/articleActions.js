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
    }
}

export function searchKeyword(keyword){
    return {type:'SEARCH_BY_KEYWORD', keyword}
}

export function addArticle(message, file){
    if (message == '') return {type:''};

    return (dispatch, getState) => {
        const date = new Date()
        const article = {
            _id: Math.floor(Math.random * 10000000),
            author: getState().profile.username,
            comments: [],
            date: date.toUTCString(),
            img: file,
            text: message
        }

        dispatch({type:'ADD_ARTICLE', article})
    }

}