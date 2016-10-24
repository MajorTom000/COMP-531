import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { resource } from '../../actions'

export const fetchProfile = () => {
    return (dispatch)=>{
        dispatch(fetchProfileField('avatars'))
        dispatch(fetchProfileField('zipcode'))
        dispatch(fetchProfileField('email'))
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
            }

            dispatch(action)
        })
    }
}