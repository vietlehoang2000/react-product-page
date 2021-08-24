import { createSlice } from '@reduxjs/toolkit'

const initialState={
    userName:'',
    passWord:'',
    logInStatus:false
}

export const authenticateSlide = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
      getAccount: (state,action) => {
        state.userName = action.payload;
        state.passWord = action.payload;
      },
      checkAccount: (state,action) => {
        if(action.payload===state.userName&&action.payload===state.passWord){
            state.logInStatus=true;
        }
      },
    //   incrementByAmount: (state, action) => {
    //     state.value += action.payload
    //   },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { getAccount, checkAccount} = authenticateSlide.actions
  
  export default authenticateSlide.reducer