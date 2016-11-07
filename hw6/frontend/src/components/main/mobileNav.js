import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {LogoutAction} from '../auth/authActions'
import UserView from './userView'
import Following from './following'

import {follow} from './followingActions'


export const MobileNav = ({dispatch, username, image,email, headline, followers})=>{
    
        return (
            <div className="container hide-on-large-only">
                <div className="row">
                    <div className="card-panel blue white-text center-align" id="profilemobile" onClick={()=>dispatch({type:'TO_PROFILE'})}>Profile</div>
                </div>
                <div className="row">
                    <div className="card-panel blue white-text center-align" id="logoutmobile"  onClick={() => dispatch(LogoutAction())}>Logout</div>
                </div>
                <div className="row center-align">
                    <img className="circle" src={image}/>
                </div>
                <div className="row center-align">
                    <span className="black-text name">{username}</span>
                    <br/>
                    <span className="black-text email">{email}</span>
                </div>
                <div className="row center-align">
                    <h5 id="status">{headline}</h5>
                </div>
                <div>
                    <ul className="collection">
                            { Object.keys(followers).sort().map((f) => followers[f]).map((follower) =>
                                <Following key={follower.name}
                                    name={follower.name} image={follower.image} headline={follower.headline} />
                            )}
                    </ul>
                </div>
            </div>
        )
    }

MobileNav.PropTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    followers:PropTypes.arrayOf(PropTypes.shape({
        ...Following.propTypes
    })).isRequired,
    dispatch:PropTypes.func.isRequired,
}

export default connect(
    (state)=>{
        return{
            username: state.profile.username,
            email: state.profile.email,
            image: state.profile.image,
            headline: state.profile.headline,
            followers: state.followers.followers
        }
    }
)(MobileNav)