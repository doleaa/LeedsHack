export const setSearchType = searchType => {
    return {
        type: "SET_SEARCH_TYPE",
        searchType
    }
}

export const setGroupType = groupType => {
    return {
        type: "SET_GROUP_TYPE",
        groupType
    }
}

export const setOrigin = origin => {
    return {
        type: "SET_ORIGIN",
        origin
    }
}

export const setDestination = destination => {
    return {
        type: "SET_DESTINATION",
        destination
    }
}

export const setMonth = month => {
    return {
        type: "SET_MONTH",
        month
    }
}

export const setYear = year=> {
    return {
        type: "SET_YEAR",
        year
    }
}

export const goHome = () => {
    return {
        type: "SET_SEARCH_TYPE",
        searchType: ""
    }
}

export const setResponse = response => {
    return {
        type: "SET_RESPONSE",
        response
    }
}

export const searchOffers = formBody => {
    return dispatch => {
        const year = formBody.year.label
        const originMonth = formBody.month.value
        let destinationMonth = parseFloat(formBody.month.value) + 1
        if (destinationMonth < 10) {
            destinationMonth = "0"+destinationMonth
        }

        const url = "http://127.0.0.1:8090/metadata/single/offers?origin="
        +formBody.origin
        +"&destination="+formBody.destination
        +"&outDate="+year+"-"+originMonth
        +"&inDate="+year+"-"+destinationMonth

        fetch(url)
        .then(response => {
            return response.json()
        })
        .then( json => {
            dispatch(setResponse(json ))
        }).catch(error =>
            console.log(error)
        )
    }
}

