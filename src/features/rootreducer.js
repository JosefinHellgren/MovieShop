import { combineReducers } from "redux";
import { reducer as movieReducer } from "./movies";
import {reducer as selectedMovieReducer} from "./selectedmovie"
import {reducer as navigatePaymentReducer} from "./navigatePayment"

const rootReducer = combineReducers({
    movies : movieReducer,
    selectedMovie : selectedMovieReducer,
   navigatePayment : navigatePaymentReducer
})

export {rootReducer};