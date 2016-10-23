import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Register from './register'
import Login from './login'



export const Landing = ({title}) => (
    <div>
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper blue">
                    <a href="#" className="brand-logo">{title}</a>
                </div>
            </nav>
        </div>
        <div className="container">
            <div className="forms">
                <div className="row">
                    <div className="register col s12 m6 l6">
                        <Register/>
                    </div>
                    <div className="login col s12 m4 l4 right">
                        <Login/>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
)

Landing.propTypes={
    title: PropTypes.string.isRequired
}

export default connect(
)(Landing)