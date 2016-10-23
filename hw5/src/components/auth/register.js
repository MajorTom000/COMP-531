import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


export const Register = () => (
    <div>
        <form>
            <div className="input-field">
                <label htmlFor="aname">Account Name</label>
                <input id="aname" type="text" name="AName" required/>
            </div>
            <div className="input-field">
                <label htmlFor="dname">Display Name (Optional)</label>
                <input id="dname" type="text" name="DName"/>
            </div>
            <div className="input-field">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" name="Email" required/>
            </div>
            <div className="input-field">
                <label htmlFor="phone">Phone Number (10 digit)</label>
                <input id="phone" type="text" name="Phone" pattern="[0-9]{10}" required/>
            </div>
            <div className="input-field">
                <label htmlFor="DOB">Date of Birth</label>
                <input type="text" className="datepicker" name="DOB" id="DOB" required/>
                
            </div>
            <div className="input-field">
                <label htmlFor="zip">Zip Code (5 digits)</label>
                <input id="zip" type="text" name="Zip" pattern="[0-9]{5}"  required/>
            </div>
            <div className="input-field">
                <label htmlFor="pass1">Password</label>
                <input type="password" name="Pass" id="pass1" required/>
            </div>
            <div className="input-field">
                <label htmlFor="pass2">Password Confirmation</label>
                <input type="password" name="PassConf" id="pass2" required/>
            </div>
            <input type="hidden" name="TimeStamp" id="timeStamp"/>
            <span className="warning"></span>
            <br/>
            <input className="waves-effect waves-light btn blue" type="submit" value="Register"/>
            <input className="waves-effect waves-light btn blue" type="button" value="Clear"/>
        </form>
    </div>
)

Register.propTypes = {

}

export default connect()(Register)