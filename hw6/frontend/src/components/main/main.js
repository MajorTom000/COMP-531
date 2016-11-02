import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Nav from './nav'
import ArticlesView from '../article/articlesView'

export const Main = ({title})=> (
    <div>
        <header>
        <Nav title={title}/>
        </header>
        <main>
        <ArticlesView/>
        </main>
    </div>
)
Main.PropTypes = {

}

export default connect()(Main)