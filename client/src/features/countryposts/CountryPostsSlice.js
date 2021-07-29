import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const countryPostsSlice = createSlice({
  name: "countryposts",
  initialState,
  reducers: {
    postsAdded(state, action) {
      return action.payload;
    },
  },
});
export const { postsAdded } = countryPostsSlice.actions;
export default countryPostsSlice.reducer;
