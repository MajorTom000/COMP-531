import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

let resource, articleActions, url
describe('Test articleActions', () => {

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            url = require('../../actions').url
            resource = require('../../actions').resource
            articleActions = require('./articleActions')
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  


    it('should change the keyword', ()=>{
        const keyword = 'somekeyword'
        expect(articleActions.searchKeyword(keyword)).to.eql({type:'SEARCH_BY_KEYWORD',keyword})
        
    })

    it('should fetch article', (done)=>{
        const getState = {articles : {avatars:{}}}

        mock(`${url}/articles`,{
            method:'GET',
            headers: {'Content-Type':'application/json'},
            json: { articles: [{_id: 1, author: 'Scott', comments: [] }]}
        })

        articleActions.fetchArticles()(
            action =>{
                expect(action).to.satisfy((action)=>{
                    return action.type=='UPDATE_ARTICLES' && action.articles['1'].author == 'Scott'
                })
                done()
            }
            ,
            ()=>{return getState}
        )

    })

})