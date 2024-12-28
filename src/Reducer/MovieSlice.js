import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUrl } from '../Constant/constant';

const initialState = {
  value: 0,
}

export const loginSubmit = createAsyncThunk("loginSubmit", async () => {
  const res = await fetch(`${baseUrl}/api/user/login`);
  console.log("responseeee",res)
  return res?.json();
});

export const movieSlice = createSlice({
  name: 'movies',

//   reducers: {
//     increment: (state) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += 1
//     },
//     decrement: (state) => {
//       state.value -= 1
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload
//     },
//   },
// })

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = movieSlice.actions

initialState: {
  isLoading: false,
  data: [],
  isError: false
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
 }
})

export default movieSlice.reducer

