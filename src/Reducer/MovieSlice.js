import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../Constant/constant';
import axios from 'axios';

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
  extraReducers: (builder) => {
    builder.addCase(loginSubmit.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginSubmit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(loginSubmit.rejected, (state) => {
      state.isError = true;
    });

    builder.addCase(getAllMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the movie data including pagination information
      state.movieData={}
      state.movieData = {
        movies: action.payload.movies,
        totalPages: action.payload.totalPages,
        totalMovies: action.payload.totalMovies,
      };
    });
    builder.addCase(getAllMovies.rejected, (state, action) => {
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export default movieSlice.reducer;
