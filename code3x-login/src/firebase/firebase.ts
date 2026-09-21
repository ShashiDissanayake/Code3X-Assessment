import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const REQUIRED_KEYS = ['apiKey', 'authDomain', 'projectId', 'appId'] as const

export const isFirebaseConfigured = REQUIRED_KEYS.every((key) =>
  Boolean(firebaseConfig[key]),
)

// Reuse the existing app instance (e.g. during Vite HMR) instead of initialising twice.
export const auth: Auth | null = isFirebaseConfigured
  ? getAuth(getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : null

export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
