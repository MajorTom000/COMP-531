import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {unfollow} from './followingActions'


export const Following = ({dispatch, name, headline, image})=>(
    <li className="collection-item avatar">
        <img src={image} alt="Profile Pic" className="circle"/>
        <span className="title">{name}</span>
        <p>{headline}</p>
        <span><i className="tiny material-icons remove" onClick={() => dispatch(unfollow(name))}>delete</i></span>
    </li>
) 


Following.propTypes = {
    name:PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect()(Following)