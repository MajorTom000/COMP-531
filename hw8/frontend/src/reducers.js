import {combineReducers} from 'redux'


function common(state = {
    title: "Front-End Application",
    error:'',
    success: '',
    location: ''
}, action){
    const clear = {error:'', success:''}
    switch(action.type){
        case 'TO_OUT':
            return {...state, ...clear, location:""}
        case 'TO_HOME':
            return {...state, ...clear, location:"MAIN_PAGE"}
        case 'TO_PROFILE':
            return {...state, ...clear, location:"PROFILE_PAGE"}
        case 'ON_ERROR':
            if (Materialize) {Materialize.toast(`<span class='warning'>${action.error}</span>`, 2000)}
            return {...state, ...clear, error: action.error}
        case 'ON_SUCCESS':
            if (Materialize) {Materialize.toast(`<span class='success'>${action.success}</span>`, 2000)}
            return {...state, ...clear, success: action.success}
        default:
            return {...state, ...clear}
    }
}

function articles(state = {
    articles:{},
    searchKeyword:'',
    avatars: {}
}, action){
    switch(action.type){
        case 'EDIT_ARTICLE':
        case 'ADD_ARTICLE':
            const articles = {...state.articles}
            articles[action.article._id] = action.article
            return {...state, articles}
        case 'UPDATE_ARTICLES':
            return {...state, articles: action.articles}
        case 'SEARCH_BY_KEYWORD':
            return {...state, searchKeyword: action.keyword}
        case 'UPDATE_AVATARS':
            return {...state, avatars:action.avatars}
        default:
            return state
    }
}

function profile(state = {
        username: '',
        image: '',
        email: '',
        zipcode: '',
        headline: '',
        dob: ''
},action){
    switch(action.type){
        case 'LOG_IN':
        case 'UPDATE_HEADLINE':
            return {...state, username: action.username, headline:action.headline}
        case 'UPDATE_PROFILE':
            if (action.username) return {...state, username: action.username}
            if (action.headline) return { ...state, headline: action.headline }
            if (action.image) return { ...state, image: action.image }
            if (action.zipcode) return { ...state, zipcode: parseInt(action.zipcode) }
            if (action.phone) return {...state, phone: action.phone}
            if (action.email) return { ...state, email: action.email }
            if (action.dob) return {...state, dob: action.dob}

        default:
            return state
    }
}

function followers(state = {
    followers: {}
}, action){
    switch(action.type){
        case 'UPDATE_FOLLOWER':
            return {...state, followers: action.followers}
        default:
            return state
    }
}

const Reducer = combineReducers({articles, profile, followers, common})

export default Reducer