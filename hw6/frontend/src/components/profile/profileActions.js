import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import resource from '../../actions'


export const fetchProfile = () => {
    return (dispatch)=>{
        dispatch(fetchProfileField('avatars'))
        dispatch(fetchProfileField('zipcode'))
        dispatch(fetchProfileField('email'))
        dispatch(fetchProfileField('dob'))
    }
}

export function updateHeadline(headline){
    return (dispatch) => {dispatch(updateField('headline', headline))}
}

function updateField(field, value){
    return (dispatch) => {
        if (value){
            const payload = {}
            payload[field] = value
            resource('PUT', field, payload).then((response) => {
                const action = {type: 'UPDATE_PROFILE'}
                action[field] = response[field]
                dispatch(action)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}

function fetchProfileField(field){
    return (dispatch) => {
        resource('GET', field).then((response) => {
            const action = {type: 'UPDATE_PROFILE'}
            switch(field){
                case 'avatars':
                    action.image = response.avatars[0].avatar;
                    break;
                case 'email':
                    action.email = response.email;
                    break;
                case 'zipcode':
                    action.zipcode = response.zipcode;
                    break;
                case 'dob':
                    action.dob = response.dob;
                    break;
            }

            dispatch(action)
        })
    }
}

export function UpdateProfile(email, zipcode, password, passwordconf){

    let error = ''

    if (email){
        if (!email.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
            error = 'Invalid email'
        }
    }

    if (zipcode) {
        if (!zipcode.match('^[0-9]{5}$')) {
            error =  'Invalid zipcode'
        }
    }

    if (password || passwordconf){
        if ( !password || !passwordconf || password !== passwordconf){
            error = 'Passwords do not match!'
        }
    }

    if (error != ''){
        return (dispatch)=>{
            dispatch({type:'ON_ERROR', error})
        }
    }

    return (dispatch) =>{
        dispatch(updateField('email',email))
        dispatch(updateField('zipcode',zipcode))
        dispatch(updateField('password',password))
        dispatch({type:'ON_SUCCESS', success:'Updated successfully'})
    }

}


export function UpdateProfileImage(file){
    return (dispatch) =>{
        const fd = new FormData()
        fd.append('image',file)
        resource('PUT','avatar',fd,false)
        .then((response)=>{
            dispatch({type:'UPDATE_PROFILE', image: response.avatar})
        })
    }
}