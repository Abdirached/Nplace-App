# Nplace

A request marketplace: **buyers post what they need** — free text plus specifications,
tagged by country and province — and **sellers respond** through comments and real-time chat.

Built by hand in 2021–2022 (before AI assistance), as a full-stack project from
database schema to Redux state to WebSocket plumbing.

## Features

- **Auth**: email/password (bcrypt + JWT) and Google OAuth for both buyer and seller
  roles; sessions carried in httpOnly cookies
- **Requests (Posts)**: create / edit / delete posts with text, specifications and a
  video attachment; browse feeds by country and province
- **Discussions**: comments and threaded replies with edit/delete
- **Real-time chat**: Socket.IO per-user rooms, read receipts (`chatStatus`),
  new-chat and new-post broadcasts
- **Audio messages**: in-browser recording through a custom `useRecorder` hook
- **Notifications**: per-user notification records
- **Uploads**: direct-to-S3 uploads with server-issued, size-limited presigned POST policies
- **Password reset**: email flow via Amazon SES with signed, expiring JWT links

## Architecture

```
client/   React 18 + Redux Toolkit + React Router + Tailwind (CRA / craco)
  src/features    Redux slices (users, country feeds, province feeds)
  src/context     SocketProvider, MessagesProvider, UserProvider
  src/hooks       useRecorder, useAuthListener, UseLocationListner
server/   Express + Socket.IO + Sequelize (PostgreSQL)
  models/         7 models with full associations
  routes/         Posts, SignUp, SignIn, Profile, Notifications, Chats,
                  Storage, ForgetPassword, GoogleAuth
  db.js           single shared database connection (env-driven)
```

### Data model

```
User  1—N  Post, Comment, CommentReply, Notification
User  1—N  Message  (as Sender and as Receiver)
Post  1—N  Comment, CommentReply
Chat  1—N  Message
```

All primary keys are UUIDs. Models live in `server/models/`; the schema is created on
boot via `sequelize.sync()`.

## Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express, Socket.IO |
| Database | PostgreSQL via Sequelize |
| Auth | Passport (Google OAuth 2.0), JWT, bcrypt |
| Storage | Amazon S3 (presigned POST uploads, 10 MB cap) |
| Email | Amazon SES (password-reset links) |
| Frontend | React 18, Redux Toolkit, React Router, Tailwind CSS |

## Getting started

### Server

```bash
cd server
npm install
cp .env.example .env     # database, JWT, Google OAuth, S3, SES values
npm start                # API + Socket.IO on http://localhost:5000
```

### Client

```bash
cd client
npm install
npm start                # http://localhost:3000
```

### Environment variables

See `server/.env.example`:

| Variable | Purpose |
|---|---|
| `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `HOST`, `DIALECT` | PostgreSQL connection |
| `JWT_SECRET` | Signs auth cookies and reset links |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth strategies |
| `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_REGION`, `S3_BUCKET` | Uploads |
| `EMAIL_SENDER` | Verified SES sender address for reset emails |

Never commit your real `.env` — it is git-ignored.

## How it works

- The client requests a presigned POST from `GET /Storage/signedurl/:filename` and uploads
  the file straight to S3; object keys are UUID-prefixed to avoid collisions.
- The API and Socket.IO share one HTTP server. Each socket joins a room keyed by the user id;
  chat messages, read receipts and feed updates are broadcast to the relevant rooms only.
- Passwords from Google sign-ups are random 32-byte values — accounts authenticate through
  Google or the reset flow, never a default password.
