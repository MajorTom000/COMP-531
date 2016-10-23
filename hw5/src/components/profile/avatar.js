import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const Avatar = ({username,image, email, zipcode})=>(
    <div className="primary userprofile center-align">
        <div className="row">
            <img src={image} className="circle responsive-img"/>
        </div>
        <div className="row">
            <h3>Current Info</h3>
        </div>
        <div className="row">
            Display Name:  <span id="p_dname" className="old">{username}</span>
        </div>
        <div className="row">
            Email:  <span id="p_email" className="old">{email}</span>
        </div>
        <div className="row">
                Zip Code:  <span id="p_zip" className="old">{zipcode}</span>
        </div>
    </div>
)


Avatar.propTypes = {


}


export default connect(
    (state)=>{
        return{
            username: state.profile.username,
            image: state.profile.image,
            email: state.profile.email,
            zipcode: state.profile.zipcode
        }
    }
)(Avatar)