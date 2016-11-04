import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {resource} from '../../actions'
import {fetchProfile} from '../profile/profileActions'
import {fetchFollowers} from '../main/followingActions'
import {fetchArticles} from '../article/articleActions'

export function init(){
    return (dispatch) => {
        resource('GET','headlines')
        .then((response)=>{
            dispatch({type:'TO_HOME'})
            dispatch({type:'UPDATE_HEADLINE',username:response.headlines[0].username, headline:response.headlines[0].headline})
            dispatch(fetchProfile())
            dispatch(fetchFollowers())
            dispatch(fetchArticles())
        })
        .catch((err)=>{
            //console.log(err)
            //console.log(err.stack)
        })
    }
} 


export function LoginAction(username, password){

    if (!username || !password){
        return (dispatch)=>{
            dispatch({type:'ON_ERROR',error:'Username/Password cannot be empty'})
        }
    }

    return (dispatch) =>{
        resource('POST','login',{username, password})
        .then((response)=>{
            dispatch({type:'LOG_IN', username:response.username})
            dispatch(init())
        }).catch((err)=>{
            console.log(err)
            dispatch({type:'ON_ERROR', error: `Error Logging in as ${username}`})
        })
    }
}

export function LogoutAction(){
    return (dispatch) => {
        resource('PUT', 'logout')
        .then(dispatch({type:'TO_OUT'}))
        .catch((err)=>{
            dispatch({type:'LOG_IN', username:undefined})
            dispatch({type:'TO_OUT'})
        })
    }
}

export function RegisterAction(username, email,dob, zipcode, password, passwordconf){

    const error = ValidateRegistration(username, email, dob, zipcode, password, passwordconf)

    if (error != ''){
        return (dispatch)=>{
            dispatch({type:'ON_ERROR', error})
        }
    }


    return (dispatch)=>{
        resource('POST','register',{username, email, dob, zipcode, password})
        .then((response)=>{dispatch({type:'ON_SUCCESS', success:`successfully registered as ${response.username}`})})
        .catch((err)=>{
            dispatch({type:'ON_ERROR', error:'there is something wrong'})
        })
    }
}


export function ValidateRegistration(username, email, dob,  zipcode, password, passwordconf){

    if(!username || !email || !dob || !zipcode || !password || !passwordconf){
        return 'You have to fill out all fields'
    }

    let currentDate = new Date()
    let bTime  = new Date(dob)
    let timeString = currentDate.getFullYear() - 18 + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate()
    let timeBar = new Date(timeString)
    let comparison = timeBar.getTime() >= bTime.getTime()
    if (bTime.getTime() === bTime.getTime() && !comparison){
        return 'You need to be 18 years old or above to register!'
    }

    if (password !== passwordconf){
        return 'Passwords do not match!'
    }

    return ''
}

export default LoginAction