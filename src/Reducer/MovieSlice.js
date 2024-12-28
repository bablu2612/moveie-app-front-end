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
  return await res.data;
});

export const getAllMovies = createAsyncThunk('getAllMovies', async ({ page=1  ,limit=6  }) => {

  const res = await axios.get(`${baseUrl}/api/movies?page=${page}&limit=${limit}`);
  // Return the full response including the pagination info
  return res.data;
});

export const createMovie = createAsyncThunk("createMovie", async (values) => {
  const res = await axios.post(`${baseUrl}/api/movies`,values,header)
  return await res.data
});


export const getMovie = createAsyncThunk("getMovie", async ({id}) => {
  const res = await axios.get(`${baseUrl}/api/movies/${id}`,header)
  return await res.data
});

export const updateMovie = createAsyncThunk("updateMovie", async ({id,values}) => {
  const res = await axios.put(`${baseUrl}/api/movies/${id}`,values,header)
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
    movie:{},
    updateMovieData:{}
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

   builder.addCase(getMovie.pending, (state, action) => {
    state.isLoading = true;
   })
   builder.addCase(getMovie.fulfilled, (state, action) => {
    state.isLoading = false;
    state.movie = action.payload;
   })
   builder.addCase(getMovie.rejected, (state, action) => {
    state.isError = true;
    state.error = action.error.message
   })

   builder.addCase(updateMovie.pending, (state, action) => {
    state.isLoading = true;
   })
   builder.addCase(updateMovie.fulfilled, (state, action) => {
    state.isLoading = false;
    state.updateMovieData = action.payload;
   })
   builder.addCase(updateMovie.rejected, (state, action) => {
    state.isError = true;
    state.error = action.error.message
   })


 }
})


export default movieSlice.reducer;
