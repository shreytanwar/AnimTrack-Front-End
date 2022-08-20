//malId
export const updateMalId = (malId) => {
    return{
        type: 'UPDATEMALID',
        payload: malId
    }
}

//search results
export const updateSearchResults = (searchResults) => {
    return{
        type: 'UPDATERESULT',
        payload: searchResults
    }
}

//RESET SEARCH RESULT
export const resetSearchResults = () => {
    return{
        type: 'RESETRESULT'
    }
}