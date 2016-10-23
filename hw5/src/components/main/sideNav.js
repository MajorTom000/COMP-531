import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UserView from './userView'
import Following from './following'

import {follow} from './followingActions'
export const SideNav = ({currentUser, followers, name, image, headline, dispatch})=>{
    let newUser;
    return (<div className="side-nav fixed side-profile hide-on-med-and-down">
        <ul>
            <li className="black-text">
                <UserView name={name} image={image} headline={headline}/>
            </li>
            <li>
                <ul className="collection">
                    { Object.keys(followers).sort().map((f) => followers[f]).map((follower) =>
                    <Following key={follower.name}
                        name={follower.name} image={follower.image} headline={follower.headline}/>
                    )}
                </ul>
            </li>
            <li>
                <input type="text" className="white small" id="statusinput" ref={(node)=>{newUser = node}}/>
                <input type="button" className="btn btn-small" value="Follow" 
                    onClick={()=>{
                        dispatch(follow(newUser.value))
                        newUser.value = ''
                }}/>
            </li>
        </ul>
    </div>
    )
}


export default connect(
    (state)=>{
        return{
            name: state.profile.username,
            image: state.profile.image,
            headline: state.profile.headline,
            followers: state.followers.followers
        }
    }
)(SideNav)