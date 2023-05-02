import { createAction, createReducer } from "@reduxjs/toolkit";

const selectMovie = createAction('select movie');
const clearMovie = createAction('clear movie');

const actions = {selectMovie, clearMovie};

const initialState = {
        selectedMovie: null
    };

const reducer = createReducer(initialState, builder => {
    builder
      .addCase(selectMovie, (state, action) => {
        state.selectedMovie = action.payload;
      //  console.log(state.selectedMovie);
      })
      .addCase(clearMovie, (state, action) => {
        state.selectedMovie = null;
        console.log(state.selectedMovie);
      });
  });

  export { actions, reducer };