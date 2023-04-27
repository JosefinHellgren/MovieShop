import { combineReducers } from "redux";
import { reducer as movieReducer } from "./movies";

const rootReducer = combineReducers({
    movies : movieReducer
   
})

export {rootReducer};