import { createSlice } from '@reduxjs/toolkit'

const initialState = []
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded(state, action){
      state.push(action.payload)
    }
  }
})
export const {userAdded} = usersSlice.actions
export default usersSlice.reducer