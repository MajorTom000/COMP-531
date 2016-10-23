import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import LoginAction from './authActions'

export const Login = ({dispatch, error}) => {
    let username;
    let password;


    const _login = () => {
        dispatch(LoginAction(username.value, password.value))
    }

    return (
        <div>
            <div className="input-field">
                <label htmlFor="username2">User Name</label>
                <input id="username2" type="text" ref={(node)=>username = node}/>
            </div>
            <div className="input-field">
                <label htmlFor="password2">Password</label>
                <input id="password2" type="password" ref={(node)=>password = node}/>
            </div>
            <span className ="warning">{error}</span>
            <br/>
            <button className="waves-effect waves-light btn blue" onClick={_login}>Login</button>
        </div>
    )
}


export default connect(
    (state) =>{
        return {
            error: state.common.error
        }
    }
)(Login)