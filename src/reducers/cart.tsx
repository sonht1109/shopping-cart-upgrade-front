import * as constants from '../common/constants'

interface Action {
    type: String,
    payload: any
}

var initState:any[] = []

var cartReducer = (state = initState, action:Action) => {
    switch(action.type){
        case constants.UPDATE_CART:
            return {...action.payload}
        default:
            return [...state]
    }
}

export default cartReducer