const searchType = (state = "", action) => {
    switch (action.type) {
        case 'SET_SEARCH_TYPE':
            return action.searchType
        default:
            return state
    }
}

export default searchType