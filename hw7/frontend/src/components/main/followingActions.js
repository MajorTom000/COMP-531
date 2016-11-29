import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {resource} from '../../actions'

export function fetchFollowers(method, name){
    return (dispatch, getState) => {

        if (method == 'PUT' && getState().followers.followers[name]){
            return dispatch({type:'ON_ERROR', error: `Already following ${name}`})
        }


        resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
        .then((response)=>{
            
            if (method == 'PUT' && response.following.indexOf(name) < 0){
                return dispatch({type:'ON_ERROR', error: `${name} does not exist`})
            }

            const _followers = response.following.reduce((o,v,i) => {o[v] = {name: v}; return o}, {})
            const followerList = response.following.join(',')

            const updateHeadline = resource('GET', `headlines/${followerList}`)
                .then((response)=>{
                    response.headlines.forEach((u)=>{
                        const user = _followers[u.username]
                        if (user){
                            user.headline = u.headline
                        }
                    })
                })
            
            const updateAvatar = resource('GET', `avatars/${followerList}`)
                .then((response)=>{
                    response.avatars.forEach((u)=>{
                        const user = _followers[u.username]
                        if (user){
                            user.image = u.avatar
                        }
                    })
                })

            Promise.all([updateHeadline, updateAvatar]).then(()=>{
                dispatch({type:'UPDATE_FOLLOWER', followers: _followers})
            })

        })
        .catch((err) => {dispatch({type:'ON_ERROR', error:'error happened when fetching followers'})})
    }
}

export function unfollow(name){
    const e = new Error()
    console.log(e.stack)
    return fetchFollowers('DELETE',name)

}


export function follow(name){
    return fetchFollowers('PUT',name)
}