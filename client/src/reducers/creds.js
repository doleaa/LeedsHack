const creds = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CREDS':
            return action.creds
        default:
            return state
    }
}

export default creds