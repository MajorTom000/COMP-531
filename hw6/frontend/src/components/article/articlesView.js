import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Article from './article'
import NewArticle from './newArticle'
import {searchKeyword} from '../article/articleActions'


export const ArticlesView = ({username, articles, dispatch}) => {

    let keyword
    return (

        <div className = "container">
            <NewArticle/>
            <div className = "row">
                <i className="material-icons left">search</i><span>Search Feed</span>
                <input id="search" type="search" className="right" ref={(node)=>keyword = node} onChange={ () => {dispatch(searchKeyword(keyword.value))}} />
            </div>
            {
                articles.sort((a,b)=> {
                    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
                }).map((article) => 
                <Article key={article._id} _id={article._id} username={username} author={article.author}
                    date={article.date} text={article.text} image={article.img} avatar={article.avatar}
                    comments={article.comments}/> 
            )}
        </div>
    )
}


ArticlesView.propTypes = {
    username: PropTypes.string.isRequired,
    articles: PropTypes.arrayOf(PropTypes.shape({
        ...Article.propTypes
    }).isRequired).isRequired
}

export function filter(avatars, keyword, stateArticles,username){
    let articles = Object.keys(stateArticles).map((id) => stateArticles[id])
        if (keyword && keyword.length > 0) {
            articles = articles.filter((a) => {
                return a.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
                    a.author.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
            })
        }   
        articles = articles.map((a) => {
            return {...a, avatar: avatars[a.author], comments: a.comments.map((c) => {
                return { ...c, avatar: avatars[c.author] }
            })}
        })
        return {
            username,
            articles
        }
}

export default connect(
    (state) => {
        const avatars = state.articles.avatars
        const keyword = state.articles.searchKeyword
        const articles = state.articles.articles
        const username = state.profile.username

        return filter(avatars, keyword, articles, username)
    }
)(ArticlesView)