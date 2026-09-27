# Nplace — Client

React front end for **Nplace**, a location-based reverse marketplace: buyers post orders
(text + specifications) in their area, local sellers see them in their feed and respond
with offers over built-in real-time chat.

## What's inside

```
src/
  features/     Redux Toolkit slices — users, country posts, province posts
  context/      SocketProvider (one shared socket), MessagesProvider, UserProvider
  hooks/        useRecorder (audio messages), useAuthListener, UseLocationListner
  components/
    post/           post cards, single-post view, comments & replies, PostChat (offer thread)
    chat/           chat sidebar, message list, composer
  pages/        HomeCountry, HomeProvince, Add, EditPost, SinglePostPage, Profile,
                SignIn, SignUp, ForgotPassword, ResetPassword, Notifications, Chat
```

## The flow

1. `Add` — buyer posts an order: text, specifications, optional video, country/province
2. `HomeCountry` / `HomeProvince` — location feeds where sellers see local demand
3. `PostChat` — seller messages the buyer from a post (offers); opens or reuses the chat
4. `Chat` — buyers and sellers continue the conversation in real time

## State & realtime

- **Redux Toolkit** holds feeds and user state (`features/*/Slice.js`)
- A single Socket.IO connection is provided via context; the client emits `sendMessage`,
  `chatStatus`, `newPost`, `newChat` and listens for `getMessage`, `getChatStatus`,
  `getNewPost`, `getNewchat`
- `useRecorder` wraps MediaRecorder for audio messages

## Setup

```bash
npm install
npm start      # http://localhost:3000
```

Expects the API at `http://localhost:5000` (see the `server/` folder).

## Stack

React 18 · Redux Toolkit · React Router · Tailwind CSS · Axios · Socket.IO client ·
Create React App (craco)
