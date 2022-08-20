const SearchResultReducer = (state = [], action) => {
    switch(action.type){
        case 'UPDATERESULT':
            return action.payload
        case 'RESETRESULT':
            return []
        default:
            return state
    }
}
export default SearchResultReducer