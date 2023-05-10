import { createAction, createReducer } from "@reduxjs/toolkit";

const showSearchDropDown = createAction('show searchdropdown');
const hideSearchDropDown = createAction('hide searchdropdown');

const actions = {showSearchDropDown, hideSearchDropDown};

const initialState = {
        searchDropDown: null
    };

const reducer = createReducer(initialState, builder => {
    builder
      .addCase(showSearchDropDown, (state, action) => {
        state.searchDropDown = true;
      })
      .addCase(hideSearchDropDown, (state, action) => {
        state.searchDropDown = false;
      });
  });

  export { actions, reducer };