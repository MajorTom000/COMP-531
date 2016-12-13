import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {RegisterAction} from './authActions'


export const Register = ({dispatch,error,success}) => {
    

    let username;
    let email;
    let dob;
    let zipcode;
    let password;
    let passwordcof;

    const _clear = () => {
        username.value = ''
        email.value = ''
        dob.value =''
        zipcode.value = ''
        password.value = ''
        passwordcof.value = ''
    }

    const _register = () =>{
        if (!username.value){
            return (dispatch)=>{
                dispatch({type:'ON_SUCESS', success:'Cannot register without username'})
            }
            
        }
        dispatch(RegisterAction(username.value, email.value,dob.value, zipcode.value,password.value, passwordcof.value))
    }



    
    return (
    <div>
        <form onSubmit={(e)=>{
            e.preventDefault()
        }}>
            <div className="input-field">
                <label htmlFor="aname">Account Name</label>
                <input id="aname" type="text" name="AName" ref={node=>username = node} required/>
            </div>
            <div className="input-field">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" name="Email" ref={node=>email = node} required/>
            </div>
            <div className="input-field">
                <label htmlFor="DOB" className="active">Date of Birth</label>
                <input type="Date" className="datepicker" name="DOB" id="DOB" ref={node=>dob = node} required/>
                
            </div>
            <div className="input-field">
                <label htmlFor="zip">Zip Code (5 digits)</label>
                <input id="zip" type="text" name="Zip" pattern="[0-9]{5}" ref={node=>zipcode = node} required/>
            </div>
            <div className="input-field">
                <label htmlFor="pass1">Password</label>
                <input type="password" name="Pass" id="pass1" ref={node=>password = node} required/>
            </div>
            <div className="input-field">
                <label htmlFor="pass2">Password Confirmation</label>
                <input type="password" name="PassConf" id="pass2" ref={node=>passwordcof = node} required/>
            </div>
            <input type="hidden" name="TimeStamp" id="timeStamp"/>
            <br/>
            <input className="waves-effect waves-light btn blue" id="register" type="submit" onClick={_register} value="Register"/>
            <input className="waves-effect waves-light btn blue" type="button" onClick={_clear} value="Clear"/>
        </form>
    </div>
)}

Register.propTypes = {

}

export default connect(    
    (state)=>{
        return{
            error: state.common.error,
            success: state.common.success
        }
})(Register)