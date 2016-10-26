import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'



export const ProfileNav = ({title, toHome})=>(
    <div>
    <div className="navbar-fixed">
        <nav>
            <div className="nav-wrapper blue">
                <a className="brand-logo">{title}</a>
                <ul className="right hide-on-med-and-down">
                    <li><a onClick={toHome}>Home</a></li>
                </ul>
            </div>
        </nav>
    </div>
    <div className="container">
        <div className="row hide-on-large-only">
            <div className="card-panel blue white-text center-align" onClick={toHome}>Home</div>
        </div>
    </div>
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