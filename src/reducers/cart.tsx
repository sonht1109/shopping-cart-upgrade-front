import * as constants from '../common/constants'

interface Action {
    type: String,
    payload?: any
}

var initState:any[] = []

var cartReducer = (state = initState, action:Action) => {
    switch(action.type){
        case constants.UPDATE_CART:
            const {product, detail} = action.payload
            var isExit = false
            state.forEach((item, index) => {
                if(item.product._id === product._id && detail.size === item.detail.size){
                    if(item.detail.quantity === detail.quantity){
                        state.splice(index, 1)
                    }
                    else{
                        state[index] = {...state[index], detail}
                    }
                    isExit = true
                }
            })
            if(isExit === false) state.push({product, detail})
            return [...state]

        case constants.PURCHASE:
            state = []
            return [...state]

        default:
            return [...state]
    }
}

export default cartReducer