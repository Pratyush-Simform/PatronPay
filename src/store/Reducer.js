const initialState = {
    buttonValue: false,
}

const reducer = (state, action) => {
    console.log(state);
    switch(action.type) {
        case "DONE": 
        return {
            ...state,
            buttonValue : !state.buttonValue
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
        default : return;
    }
} 

export { reducer, initialState };