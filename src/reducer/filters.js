import { combineReducers } from 'redux'
import selectReducer from './select'
import dateReducer from './date'

export default combineReducers({
    selected: selectReducer,
    date: dateReducer
})