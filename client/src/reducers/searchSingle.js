const initialState = {
    origin: "",
    destination: "",
    month: "",
    year: "",
}

const searchSingle = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ORIGIN':
            return Object.assign({}, state, {
                origin: action.origin
        })
        case 'SET_DESTINATION':
            return Object.assign({}, state, {
                destination: action.destination
        })
        case 'SET_MONTH':
            return Object.assign({}, state, {
                month: action.month
        })
        case 'SET_YEAR':
            return Object.assign({}, state, {
                year: action.year
        })
        default:
            return state
    }
}

export default searchSingle