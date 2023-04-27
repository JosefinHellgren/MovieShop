import { createAction, createReducer } from "@reduxjs/toolkit";

const isFetching = createAction('is fetching');
const success = createAction('success');
const failure = createAction('failure');

const actions = {isFetching, success, failure};

const STATUS = {
  NORMAL: 'normal',
  FETCHING: 'is fetching',
  SUCCESS: 'success',
  FAILURE: 'failure'
};

const initialState = {
  status: STATUS.NORMAL,
  movies: {
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null
  }
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(isFetching, (state, action) => ({
      ...state,
      status: STATUS.FETCHING
    }))
    .addCase(success, (state, action) => {
      const { payload } = action;
      const { category, movies } = payload;
      return {
        ...state,
        status: STATUS.SUCCESS,
        movies: {
          ...state.movies,
          [category]: movies
        }
      };
    })
    .addCase(failure, (state, action) => ({
      ...state,
      status: STATUS.FAILURE
    }));
});

export { actions, STATUS, reducer };