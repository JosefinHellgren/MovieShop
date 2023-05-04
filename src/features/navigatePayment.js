import { createAction,createReducer } from "@reduxjs/toolkit";



const fromPayment = createAction('setToTrue');
const notFromPayment = createAction('setToFalse');


const initialState = {
  payment: false
};


const reducer = createReducer(initialState, (builder) => {
    builder.addCase(fromPayment, (state) => {
      state.payment = true;
    })
    .addCase(notFromPayment,(state)=>{
        state.payment = false;

    })
  });

  export  {reducer,fromPayment,notFromPayment}





  
