import { combineReducers } from 'redux'
import collectionReducer from '../reducers/collections';
import appReducer from '../reducers/app';

const reducer = combineReducers({
    collectionReducer,
    appReducer
})

export default reducer