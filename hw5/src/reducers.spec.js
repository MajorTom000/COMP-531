import { expect } from 'chai'
import mockery from 'mockery'
import Reducer from './reducers'


const initialState = {
    common:{
        title: "Front-End Application",
        error:'',
        success: '',
        location: ''
    },
    articles:{
        articles:{},
        searchKeyword:'',
        avatars: {}
    },
    profile: {
        username: '',
        image: '',
        email: '',
        zipcode: '',
        headline: ''
    },
    followers:{
        followers: {}
    }
}

describe('Test Reducer Initialization', ()=>{
    it('should return the initial state', ()=>{
        expect(Reducer(undefined, {})).to.eql(initialState)
    })
})

describe('Test Common Reducer', ()=>{
    it('should navigate to main page', ()=>{
        expect(Reducer(undefined, {type:'TO_HOME'})).to.eql({...initialState,common:{...initialState.common, location:"MAIN_PAGE"}})
    })
    it('should navigate to profile page', ()=>{
        expect(Reducer(undefined, {type:'TO_PROFILE'})).to.eql({...initialState,common:{...initialState.common, location:"PROFILE_PAGE"}})
    })
    it('should navigate to landing page', ()=>{
        expect(Reducer(undefined, {type:'TO_OUT'})).to.eql(initialState)
    })
    it('should update the success message', ()=>{
        const success = 'something'
        expect(Reducer(undefined, {type:'ON_SUCCESS', success})).to.eql({...initialState, common:{...initialState.common, success}})
    })
    it('should update the error message', ()=>{
        const error = 'something'
        expect(Reducer(undefined, {type:'ON_ERROR', error})).to.eql({...initialState, common:{...initialState.common, error}})
    })
})


describe('Test Article Reducer', ()=>{
    const articles = {
        0:{id:0,author:'someone', text:'sometext'},
        1:{id:1,author:'someone', text:'sometext'}
    }

    const newarticle = {
        id: 2, author:'someoneelse',text:'test'
    }

    it('should set the articles', ()=>{
        expect(Reducer(undefined, {type:'UPDATE_ARTICLES', articles})).to.eql({...initialState, articles: {...initialState.articles, articles}})
    })

    const newArticles = {...articles, 2: newarticle}

    it('should set the articles', ()=>{
        
        expect(Reducer(Reducer(undefined, {type:'UPDATE_ARTICLES', articles}), {type:'ADD_ARTICLE', article:newarticle})).to.eql({...initialState, articles: {...initialState.articles, articles:newArticles}})
    })

    const keyword = 'keyword'
    it('should set the search keyword', ()=>{
        expect(Reducer(undefined, {type:'SEARCH_BY_KEYWORD',keyword})).to.eql({...initialState, articles:{...initialState.articles, searchKeyword:keyword}})
    })

})