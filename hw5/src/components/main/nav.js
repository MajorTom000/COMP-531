import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import MobileNav from './mobileNav'
import SideNav from './sideNav'
import {LogoutAction} from '../auth/authActions'
 

export const Nav = ({title, dispatch})=>{
    let keyword = ''
    return (
        <div>
            <div className="navbar topnavmain">
                <nav>
                    <div className="nav-wrapper blue">
                        <a className="brand-logo">{title}</a>
                        <a data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><a onClick={()=>dispatch({type:'TO_PROFILE'})}>Profile</a></li>
                            <li><a onClick={() => dispatch(LogoutAction())}>Logout</a></li>
                        </ul>
                        <MobileNav/>
                    </div>
                </nav>
            </div>
            <SideNav/>
        </div>
    )
}

export default connect()(Nav)