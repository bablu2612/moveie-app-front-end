import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '../Reducer/MovieSlice'

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
})
