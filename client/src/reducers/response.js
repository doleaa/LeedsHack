const response = (state = "", action) => {
    switch (action.type) {
        case 'SET_RESPONSE':
            return action.response
        default:
            return state
    }
}

export default response