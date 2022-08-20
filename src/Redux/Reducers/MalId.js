const MalIdReducer = (state = 0, action) => {
    switch(action.type){
        case 'UPDATEMALID':
            return action.payload
        case 'RESETMALID':
            return 0
        default:
            return state
    }
}

export default MalIdReducer;