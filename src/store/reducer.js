const initialState = {
    title: "Supply"
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case "CHANGE_TITLE":
            return {
                ...state,
                title: action.payload
            }
        default:
            return state;
    }
}