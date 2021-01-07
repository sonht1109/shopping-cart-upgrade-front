interface Action {
    type: String,
    payload: any
}

var initState:any[] = []

var collectionReducer = (state = initState, action:Action) => {
    switch(action.type){
        default:
            return [...state]
    }
}

export default collectionReducer