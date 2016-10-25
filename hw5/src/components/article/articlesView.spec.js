import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {ArticlesView} from './articlesView'
import {NewArticle} from './newArticle'

describe('Test ArticlesView', ()=>{



    it('should render the view', ()=>{

        const listArticles = [{_id: 1, author: 'Scott', date: '2015-08-08T09:39:06.195Z', comments: [] }]

        const node = shallow(
            <div>
                <ArticlesView username='qw12' articles={listArticles} dispatch={_=>_}/>
            </div>
        )
        expect(node.children().length).to.equal(1)

    })



})