import {combineReducers} from 'redux'
import posts from './posts.js'
import auth from './auth'
export default combineReducers({
    posts:posts,
    auth:auth,
})