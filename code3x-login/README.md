# Code3X Login Assessment

Login page UI built with **React + Vite + TypeScript** and **Material UI**, with
Google sign-in via **Firebase Authentication** and deployment on **Firebase Hosting**.

## Features

- Two-column login layout (form + illustration panel) that collapses to a single column on mobile
- Email / password validation (required, email format, min. 6 characters) with accessible error messages
- Show / hide password toggle
- Google sign-in with Firebase (`signInWithPopup`); on success the app redirects to `/auth-success`
  and displays the Firebase ID token returned by `user.getIdToken()`
- Apple / Facebook buttons are visual only

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in your Firebase web app config
npm run dev
```

## Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start the Vite dev server       |
| `npm run build`   | Type-check and build to `dist/` |
| `npm run lint`    | Run ESLint                      |
| `npm run preview` | Preview the production build    |

## Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase use --add            # select your Firebase project
npm run build
firebase deploy --only hosting
```

`firebase.json` rewrites all routes to `index.html`, so client-side routes such as
`/auth-success` work after deployment.

## Project structure

```
src/
├── components/IllustrationPanel.tsx   # right-hand illustration panel
├── firebase/firebase.ts               # Firebase app + auth initialisation
├── pages/
│   ├── LoginPage.tsx / LoginPage.css
│   └── AuthSuccessPage.tsx
├── services/authService.ts            # Google sign-in, sign-out, error mapping
├── types/                             # shared TypeScript types
├── theme.ts                           # MUI theme
├── App.tsx                            # routes
└── main.tsx
```
