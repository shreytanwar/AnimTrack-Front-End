import MalIdReducer from './MalId'
import SearchResultReducer from './SearchResult'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    MalId : MalIdReducer,
    SearchResult : SearchResultReducer
})

export default allReducers