import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/UsersSlice'
import countryPostsReducer from '../features/countryposts/CountryPostsSlice'
import provincePostsReducer from '../features/provinceposts/ProvincePostsSlice'


export const store = configureStore({
  reducer: {
    users: usersReducer,
    countryPosts: countryPostsReducer,
    provincePosts: provincePostsReducer
  },
})