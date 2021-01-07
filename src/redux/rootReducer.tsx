import { combineReducers } from 'redux'
import collectionReducer from '../reducers/collections';
import appReducer from '../reducers/app';
import userReducer from '../reducers/user';
import categoryReducer from '../reducers/categories';

const reducer = combineReducers({
    collectionReducer,
    appReducer,
    userReducer,
    categoryReducer
})

export default reducer