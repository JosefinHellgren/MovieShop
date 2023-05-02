import { combineReducers } from "redux";
import { reducer as movieReducer } from "./movies";
import {reducer as selectedMovieReducer} from "./selectedmovie"

const rootReducer = combineReducers({
    movies : movieReducer,
    selectedMovie : selectedMovieReducer
   
})

export {rootReducer};