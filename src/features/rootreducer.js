import { combineReducers } from "redux";
import { reducer as movieReducer } from "./movies";
import {reducer as navigatePaymentReducer} from "./navigatePayment"

const rootReducer = combineReducers({
    movies : movieReducer,
   navigatePayment : navigatePaymentReducer
})

export {rootReducer};