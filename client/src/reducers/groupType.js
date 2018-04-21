const groupType = (state = "", action) => {
    switch (action.type) {
        case 'SET_GROUP_TYPE':
            return action.groupType
        default:
            return state
    }
}

export default groupType