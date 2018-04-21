const initialState = {
    userName: "",
    password: ""
}

const login = (state = {}, action) => {
    switch (action.type) {
        case "SET_LOGIN_USER_NAME":
            return Object.assign({}, state, {
                userName: action.userName
            })
        case "SET_LOGIN_PASSWORD":
            return Object.assign({}, state, {
                password: action.password
            })
        default:
            return state
    }
}

export default login