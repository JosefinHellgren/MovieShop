import { combineReducers } from "redux";
import { reducer as movieReducer } from "./movies";
import { reducer as navigatePaymentReducer } from "./navigatePayment"
import { reducer as searchdropdownReducer } from "./searchdropdown"

const rootReducer = combineReducers({
    movies: movieReducer,
    navigatePayment: navigatePaymentReducer,
    searchDropdown: searchdropdownReducer
})

export { rootReducer };
