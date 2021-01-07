import * as constants from '../common/constants'

interface Action {
    type: String,
    payload: any
}

interface State {
    loading: boolean,
}

var initState:State = {
    loading: false,
}

var appReducer = (state = initState, action:Action) => {
    switch(action.type){
        case constants.CHANGE_LOADING:
            return {...state, loading: action.payload}

        default:
            return {...state}
    }
}

export default appReducer