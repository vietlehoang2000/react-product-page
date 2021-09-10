import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  userName: "",
  passWord: "",
  logInStatus: false,
};

const urlAPI = "https://product-list-fake-rest-server.herokuapp.com/login";

export const logIn = createAsyncThunk(
  "authenticate/logIn",
  async (inputData) => {
    
    const response = await fetch(`${urlAPI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    const data = await response.json();
    if (response.status === 200) {
      return data
    } else {
      throw data;
      // return response.status + ":" + response.statusText;
    }
  }
);

export const authenticateSlide = createSlice({
  name: "authentication",
  initialState,
  reducers: {

    getAccount: (state,action) => {
      if(action.payload[0]!==''&&action.payload[1]!==''){
      state.userName = action.payload[0];
      state.passWord = action.payload[1];
      }
      else{
        console.log('wrong')
      }
      console.log(state.userName,state.passWord)
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(logIn.fulfilled, (state, action) => {
      // Add user to the state array
      localStorage.setItem('token',action.payload.token)
      let user = {firstName:action.payload.firstName,lastName:action.payload.lastName,avatar:action.payload.avatar}
      localStorage.setItem('user',JSON.stringify(user))
      // localStorage.setItem('user',action.payload)
      state.logInStatus=true;
    }).addCase(logIn.rejected, (state, action) => {
      // Add user to the state array
      console.log(action.error.message)
    });
  },
});

// Action creators are generated for each case reducer function
export const { getAccount, checkAccount } = authenticateSlide.actions;

export default authenticateSlide.reducer;
