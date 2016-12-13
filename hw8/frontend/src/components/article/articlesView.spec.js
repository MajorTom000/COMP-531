import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {ArticlesView, filter} from './articlesView'
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

    it('should filter the articles displayed', ()=>{
        const articles = {1:{_id:1, text:'sometext1', author:'author1', date:'01/01/1990', comments:[]},
						  2:{_id:2, text:'sometext2 others', author:'author2', date:'01/01/1990', comments:[]}}
		const keyword = 'others'
        const avatars = {'author1':'someavatar1', 'author2':'someavatar2'}
        const username = 'qw12'
        expect(filter(avatars,keyword,articles,username)).to.eql({username, articles:[{...articles[2],avatar:avatars['author2']}]})
    })


})