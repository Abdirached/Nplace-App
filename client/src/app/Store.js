import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/UsersSlice'
import postsReducer from '../features/posts/PostsSlice'
import commentsReducer from '../features/comments/CommentsSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer
  },
})