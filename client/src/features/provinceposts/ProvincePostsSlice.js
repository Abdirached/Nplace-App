import { createSlice } from '@reduxjs/toolkit'

const initialState = []
const provincePostsSlice = createSlice({
  name: 'provinceposts',
  initialState,
  reducers: {
    postsAdded(state, action){
         state.push(action.payload)
      }
  }
})
export const {postsAdded} = provincePostsSlice.actions
export default provincePostsSlice.reducer