const defaultState = {
    x: "1",
    y: "",
    r: "1",
    errorStateY: ""
}


export const pointReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "X_CHANGE":
            return {...state, x: action.payload}
        case "Y_CHANGE":
            return {...state, y: action.payload}
        case "R_CHANGE":
            return {...state, r: action.payload}
        default:
            return state;
    }
}