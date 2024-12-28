import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '../Reducer/MovieSlice'
// import logger from 'redux-logger'
export const store = configureStore({
  reducer: {
    movies: movieReducer,

  },
})
