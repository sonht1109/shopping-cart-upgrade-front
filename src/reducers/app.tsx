interface Action {
    type: String,
    payload: any
}

var initState:any = {}

var appReducer = (state = initState, action:Action) => {
    switch(action.type){
        default:
            return {...state}
    }
}

export default appReducer