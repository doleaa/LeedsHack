const initialState = {
    user: "troliator96",
    pass: "troliator96"
}

const creds = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CREDS':
            return action.creds
        default:
            return state
    }
}

export default creds