import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {LogoutAction} from '../auth/authActions'
import UserView from './userView'
import Following from './following'

import {follow} from './followingActions'


class MobileNav extends Component{

    constructor(props){
        super(props)
    }


    render(){
        return (
            <ul className="side-nav" id="mobile-menu">
                <li><a href="" onClick={()=>dispatch({type:'TO_PROFILE'})}>Profile</a></li>
                <li><a href="" onClick={()=>LogoutAction()}>Logout</a></li>
                <li className="black-text">
                    <UserView name={this.name} image={this.image} headline={this.headline}/>
                </li>
                <li>
                    <ul className="collection">
                        { Object.keys(this.props.followers).sort().map((f) => this.props.followers[f]).map((follower) =>
                            <Following key={follower.name}
                                name={follower.name} image={follower.image} headline={follower.headline} />
                        )}
                    </ul>
                </li>
            </ul>
        )
    }
}

MobileNav.PropTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
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
            image: state.profile.image,
            headline: state.profile.headline,
            followers: state.followers.followers
        }
    }
)(MobileNav)