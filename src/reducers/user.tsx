import * as constants from '../common/constants'

var initState:Object = {}

interface Action{
    type: String,
    payload: Object
}

const userReducer = (state = initState, action: Action)=>{
    switch(action.type){
        case constants.GET_USER:
            return {...action.payload}
        default:
            return {...state}
    }
}

export default userReducer