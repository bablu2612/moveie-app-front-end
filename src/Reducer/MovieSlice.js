import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../Constant/constant';
import axios from 'axios'
const token=localStorage.getItem('token')
const header={
  headers: {
  'Authorization': 'Bearer ' + token
}}

export const loginSubmit = createAsyncThunk('loginSubmit', async (values) => {
  const res = await axios.post(`${baseUrl}/api/user/login`, values);
  console.log('responseeee', res);
  return await res.data;
});

export const getAllMovies = createAsyncThunk('getAllMovies', async ({ page = 1, limit = 5 }) => {
  console.log('limit>>>>>', page, limit);

  const res = await axios.get(`${baseUrl}/api/movies?page=${page}&limit=${limit}`);
  console.log('responseeee>>>>>', res);

  // Return the full response including the pagination info
  return res.data;
});

export const createMovie = createAsyncThunk("createMovie", async (values) => {
  const res = await axios.post(`${baseUrl}/api/movies`,values,header)
  console.log("responseeee",res)
  return await res.data
});



export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    isLoading: false,
    movieData: {
      movies: [],
      totalPages: 0,
      totalMovies: 0,
    },
    isError: false,
    error: null,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(loginSubmit.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(loginSubmit.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.data = action.payload;
  //   });
  //   builder.addCase(loginSubmit.rejected, (state) => {
  //     state.isError = true;
  //   });


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

   builder.addCase(createMovie.pending, (state, action) => {
    state.isLoading = true;
   })
   builder.addCase(createMovie.fulfilled, (state, action) => {
    state.isLoading = false;
    state.movie = action.payload;
   })
   builder.addCase(createMovie.rejected, (state, action) => {
    state.isError = true;
    state.error = action.error.message
   })


 }
})


export default movieSlice.reducer;
