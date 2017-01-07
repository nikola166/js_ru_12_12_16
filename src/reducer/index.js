import { combineReducers } from 'redux'
import filterReducer from './filters'
import articlesReducer from './articles'

export default combineReducers({
    filters: filterReducer,
    articles: articlesReducer
})