import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Landing from './auth/landing'
import Profile from './profile/profile'
import Main from './main/main'



export const App = ({location, title}) => {

    if (location == "MAIN_PAGE"){
        return <Main title={title}/>
    }
    else if (location == "PROFILE_PAGE"){
        return <Profile title={title}/>
    }
    else{
        return <Landing title={title}/>
    }
    
}

App.propTypes={
    title: PropTypes.string.isRequired
}

export default connect(
    (state) => {
        return {
            location: state.common.location,
            title: state.common.title
        }
    },
    (dispatch) => {
        return {

        }
    }
)(App)