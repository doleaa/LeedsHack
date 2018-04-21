export const setCreds = creds => {
    return {
        type: "SET_CREDS",
        creds
    }
}

export const pingServer = (userName, password) => {
    return dispatch => {
        let url = new URL("http://127.0.0.1:3030/ping")
        const params = {
            usr: userName,
            pwd: password
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then( json => {
            dispatch(setCreds({user: userName, pwd: password}))
        }).catch(error =>
            console.log(error)
        )
    }
}

