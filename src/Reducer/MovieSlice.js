import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUrl } from '../Constant/constant';
import axios from 'axios'

export const loginSubmit = createAsyncThunk("loginSubmit", async (values) => {
  const res = await axios.post(`${baseUrl}/api/user/login`,values)
  console.log("responseeee",res)
  return await res.data
});

export const getAllMovies = createAsyncThunk("getAllMovies", async () => {
  const res = await axios.get(`${baseUrl}/api/movies?page=1&limit=1`)
  console.log("responseeee",res)
  return await res.data
});

export const movieSlice = createSlice({

  name: 'movies',

initialState: {
  isLoading: false,
  data: [],
  movieData: [],
  isError: false,
  error:null
 },
 extraReducers: (builder) => {
  builder.addCase(loginSubmit.pending, (state, action) => {
   state.isLoading = true;
  })
  builder.addCase(loginSubmit.fulfilled, (state, action) => {
   state.isLoading = false;
   state.data = action.payload;
  })
  builder.addCase(loginSubmit.rejected, (state, action) => {
   state.isError = true;
  })

  builder.addCase(getAllMovies.pending, (state, action) => {
    state.isLoading = true;
   })
   builder.addCase(getAllMovies.fulfilled, (state, action) => {
    state.isLoading = false;
    state.movieData = action.payload;
   })
   builder.addCase(getAllMovies.rejected, (state, action) => {
    state.isError = true;
    state.error = action.error.message
   })


 }
})

export default movieSlice.reducer

