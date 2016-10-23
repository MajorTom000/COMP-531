import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'



export const ProfileNav = ({title, toHome})=>(

    <div className="navbar-fixed">
        <nav>
            <div className="nav-wrapper blue">
                <a className="brand-logo">{title}</a>
                <a data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                    <li><a onClick={toHome}>Home</a></li>
                </ul>
                <ul className="side-nav" id="mobile-menu">
                    <li><a onClick={toHome}>Home</a></li>
                </ul>
            </div>
        </nav>
    </div>

)


ProfileNav.propTypes = {
    title: PropTypes.string.isRequired
}

export default connect(null,
    (dispatch) =>{
        return {
            toHome: ()=>dispatch({type:"TO_HOME"})
        }
    }
)(ProfileNav)