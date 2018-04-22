const initialState = {
    list: []
}

const songs = (state = initialState, action)  => {
    switch (action.type) {
        case 'INTERPRET_SEARCH_RESULT':
            return Object.assign({}, state, {
                list: action.result
            })
        case 'CLEAR_SEARCH_RESULT':
            return Object.assign({}, state, {
                list: []
            })
        case 'UPDATE_SONG_SEARCH':
            return Object.assign({}, state, {
                searchTerm: action.data
            })
        default:
            return state
    }
}

export default songs