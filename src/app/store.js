import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../components/counter/counterSlice'
import authenticateReducer from '../components/authentication/authenticateSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authenticate: authenticateReducer
  },
})