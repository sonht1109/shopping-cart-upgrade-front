import * as constants from '../common/constants'

interface Action {
    type: String,
    payload: any
}

interface State {
    loading: boolean,
    isLogin: boolean
}

var initState:State = {
    loading: false,
    isLogin: false,
}

var appReducer = (state = initState, action:Action) => {
    switch(action.type){
        case constants.CHANGE_LOADING:
            return {...state, loading: action.payload}

        case constants.IS_LOGIN:
            return {...state, isLogin: action.payload}

        default:
            return {...state}
    }
}

export default appReducer