import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const ProfileForm = ()=>(
    <div className="secondary center-align">
        <div className="row">
            <div className="input-field col s12 m10">
                <div className="file-field input-field">
                    <div className="btn"><span>Update Profile Image</span><input type="file"/></div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="input-field col s12 m10">
                <label htmlFor="displayname" data-error="empty" data-success="valid">Display Name </label>
                <input id="displayname" type="text" />
            </div>
        </div>
        <div className="row">
            <div className="input-field col s12 m10">
                <label htmlFor="email" data-error="wrong format" data-success="valid">Email </label>
                <input id="email" type="email"/>
            </div>
        </div>
        <div className="row">
            <div className="input-field col s12 m10">
                <label htmlFor="phonenumber" data-error="wrong format" data-success="valid">Phone</label>
                <input id="phonenumber" type="tel"/>
            </div>
        </div>
        <div className="row">
            <div className="input-field col s12 m10">
                <label htmlFor="zipcode" data-error="wrong format" data-success="valid">Zip Code</label>
                <input id="zipcode" type="text" />
            </div>
        </div>
        <div className="row">
            <div className="input-field col s12 m10">
                <label htmlFor="password" data-error="passwords do not match" data-success="valid" id="passlabel">Password</label>
                <input id="password" type="password"/>
            </div>
        </div>
        <div className="row">
            <div className="input-field col s12 m10">
                <label htmlFor="passwordconf" data-error="passwords do not match" data-success="valid">Password Confirmation</label>
                <input id="passwordconf" type="password"/>
            </div>
        </div>
        <div className="row">
            <button className="btn waves-effect waves-light" type="submit" id="update">Update
                <i className="material-icons right">send</i>
            </button>
        </div>
    </div>
)


ProfileForm.propTypes = {}


export default connect()(ProfileForm)