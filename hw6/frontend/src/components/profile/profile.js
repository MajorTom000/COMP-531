import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


import Avatar from './avatar'
import ProfileForm from './profileForm'
import ProfileNav from './profileNav'

export const Profile = ({title})=>(
    <div>
        <ProfileNav title={title}/>
        <div className="container">
            
            <Avatar/>
            <ProfileForm/>
        </div>
    </div>

)


Profile.propTypes = {}

export default connect()(Profile)