import * as constants from '../common/constants'

interface Action {
    type: String,
    payload: any
}

var initState:any[] = []

var categoryReducer = (state = initState, action:Action) => {
    switch(action.type){
        case constants.GET_CATES:
            return [...action.payload]
        default:
            return [...state]
    }
}

export default categoryReducer