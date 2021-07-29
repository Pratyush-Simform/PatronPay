const initialState = {
    buttonValue: false,
}

const reducer = (state, action) => {
    switch(action.type) {
        case "DONE": 
        return {
            ...state,
            buttonValue : true
        }
        case "NOT_DONE":
            return {...state,
            buttonValue: false
            }
        case "ORDERS":
            return {
                ...state,
                orders: action.payload
            }
        case "TOTALDATA":
            return {
                ...state,
                totalData: action.payload
            }
        case "RETURN":
            return {
                ...state,
                returnData: action.payload
            }
        default : return;
    }
} 

export { reducer, initialState };