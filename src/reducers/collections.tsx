import * as constants from '../common/constants'

interface Action {
    type: String,
    payload: any
}

var initState:any[] = []

//not use
var collectionReducer = (state = initState, action:Action) => {
    switch(action.type){
        case constants.GET_PRODUCTS:
            return [...action.payload]
        default:
            return [...state]
    }
}

export default collectionReducer