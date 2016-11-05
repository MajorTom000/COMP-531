import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { UpdateProfile, UpdateProfileImage } from './profileActions'

export const ProfileForm = ({dispatch,error,success})=>{
    
    let email
    let zipcode
    let password
    let passwordcof

    const _clear = () => {
        email.value = ''
        zipcode.value = ''
        password.value = ''
        passwordcof.value = ''
    }


    const _update = () =>{
        if (!email.value && !zipcode.value && !password.value && !passwordconf.value){
            return (dispatch)=>{
                dispatch({type:'ON_SUCESS', success:'There is nothing to update'})
            }
            
        }

        dispatch(UpdateProfile(email.value, zipcode.value, password.value, passwordcof.value))

        _clear()
    }

    let file
    const _handleImageChange = (e) => {
        e.preventDefault()
        console.log("called")
        file = e.target.files[0]
        console.log(file)
    }

    const _handleUpload = () =>{
        dispatch(UpdateProfileImage(file))
    }

    
    return (
    <div className="secondary center-align">
        <form onSubmit={(e)=>{
            e.preventDefault()
        }}>
            <div className="row">
                <div className="input-field col s12 m10">
                    <div className="file-field input-field">
                        <div className="btn small"><span>Choose Image</span><input type="file"onChange={(e)=>_handleImageChange(e)}/></div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                        <input type="button" className="btn right" value="Upload" onClick={_handleUpload}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12 m10">
                    <label htmlFor="email" data-error="wrong format" data-success="valid">Email </label>
                    <input id="email" type="email" ref={node=>email = node}/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12 m10">
                    <label htmlFor="zipcode" data-error="wrong format" data-success="valid">Zip Code</label>
                    <input id="zipcode" type="text" ref={node=>zipcode = node}/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12 m10">
                    <label htmlFor="password" data-error="passwords do not match" data-success="valid" id="passlabel">Password</label>
                    <input id="password" type="password" ref={node=>password = node}/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12 m10">
                    <label htmlFor="passwordconf" data-error="passwords do not match" data-success="valid">Password Confirmation</label>
                    <input id="passwordconf" type="password" ref={node=>passwordcof = node}/>
                </div>
            </div>
            <div className="row">
                <button className="btn waves-effect waves-light" type="submit" id="update" onClick={_update}>Update
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>
)}


ProfileForm.propTypes = {}


export default connect(
       (state)=>{
        return{
            error: state.common.error,
            success: state.common.success
        }
}
)(ProfileForm)