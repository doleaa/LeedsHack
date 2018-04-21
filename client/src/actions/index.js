export const setLoginUserName = userName => {
    return {
        type: "SET_LOGIN_USER_NAME",
        userName
    }
}

export const setLoginPassword = password => {
    return {
        type: "SET_LOGIN_PASSWORD",
        password
    }
}

export const setCreds = creds => {
    return {
        type: "SET_CREDS",
        creds
    }
}

export const interpretSearchResult = result => {
    return {
        type: "INTERPRET_SEARCH_RESULT",
        result
    }
}

export const pingServer = (userName, password) => {
    return dispatch => {
        let url = new URL("http://127.0.0.1:3030/ping")
        const params = {
            usr: userName,
            pwd: password
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, encodeURI(params[key])))

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

export const searchSong = (userName, password, songSearchString) => {
    return dispatch => {
        let url = new URL(`http://127.0.0.1:3030/songs/${songSearchString}`)
        const params = {
            usr: userName,
            pwd: password
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, encodeURI(params[key])))

        fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then( json => {
            dispatch(interpretSearchResult(json))
        }).catch(error =>
            console.log(error)
        )
    }
}

export const downloadSong = (userName, password, songObj) => {
    return dispatch => {
        let url = new URL("http://127.0.0.1:3030/download")
        const params = {
            usr: userName,
            pwd: password
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, encodeURI(params[key])))
        Object.keys(songObj).forEach(key => url.searchParams.append(key, encodeURI(songObj[key])))

        fetch(url)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then( json => {
            dispatch(interpretSearchResult(json))
        }).catch(error =>
            console.log(error)
        )
    }
}

