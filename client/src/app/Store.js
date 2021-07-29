import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/UserSlice";
import countryPostsReducer from "../features/countryposts/CountryPostsSlice";
import provincePostsReducer from "../features/provinceposts/ProvincePostsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    countryPosts: countryPostsReducer,
    provincePosts: provincePostsReducer,
  },
});
