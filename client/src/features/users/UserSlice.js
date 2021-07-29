import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    currentUserAdded(state, action) {
      return action.payload;
    },
  },
});
export const { currentUserAdded } = userSlice.actions;
export default userSlice.reducer;
