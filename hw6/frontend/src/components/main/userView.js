import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {updateHeadline} from '../profile/profileActions'


export const UserView = ({dispatch, name, image, email, headline})=>{

    let newHeadline;

    return(
        <div className="userView">
            <img className="circle" src={image}/>
            <span className="black-text name">{name}</span>
            <span className="black-text email">{email}</span>
            <p id="status">{headline}</p>
            <input type="text" className="white small" id="statusinput" ref={(node)=>{newHeadline = node}}/>
            <input type="button" className="btn btn-small" value="Update Status" 
                onClick={()=>{
                    dispatch(updateHeadline(newHeadline.value))
                    newHeadline.value = ''
            }}/>
        </div>
    )
}

UserView.PropTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired
}


export default connect(
)(UserView)