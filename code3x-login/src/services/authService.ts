import { FirebaseError } from 'firebase/app'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/firebase'
import type { AuthSession } from '../types/auth'
import type { Notice } from '../types/notice'

export class FirebaseConfigError extends Error {
  constructor() {
    super('Firebase is not configured.')
    this.name = 'FirebaseConfigError'
  }
}

export async function signInWithGoogle(): Promise<AuthSession> {
  if (!auth) {
    throw new FirebaseConfigError()
  }

  const result = await signInWithPopup(auth, googleProvider)
  const accessToken = await result.user.getIdToken()

  return {
    accessToken,
    displayName: result.user.displayName,
    email: result.user.email,
    photoURL: result.user.photoURL,
  }
}

export async function signOutUser(): Promise<void> {
  if (auth) {
    await signOut(auth)
  }
}

export function isAuthSession(value: unknown): value is AuthSession {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const { accessToken } = value as Partial<AuthSession>
  return typeof accessToken === 'string' && accessToken.length > 0
}

const AUTH_ERROR_NOTICES: Record<string, Notice> = {
  'auth/popup-closed-by-user': {
    message: 'Google sign-in was cancelled before it finished.',
    severity: 'info',
  },
  'auth/cancelled-popup-request': {
    message: 'Another sign-in window is already open.',
    severity: 'info',
  },
  'auth/popup-blocked': {
    message: 'The sign-in popup was blocked. Please allow popups for this site and try again.',
    severity: 'warning',
  },
  'auth/network-request-failed': {
    message: 'Network error. Please check your connection and try again.',
    severity: 'error',
  },
  'auth/unauthorized-domain': {
    message: 'This domain is not authorised for Google sign-in in Firebase.',
    severity: 'error',
  },
  'auth/operation-not-allowed': {
    message: 'Google sign-in is not enabled for this Firebase project.',
    severity: 'error',
  },
  'auth/too-many-requests': {
    message: 'Too many attempts. Please wait a moment and try again.',
    severity: 'error',
  },
}

const CONFIG_ERROR_NOTICE: Notice = {
  message: 'Firebase is not configured correctly. Please check the environment variables.',
  severity: 'error',
}

export function getAuthErrorNotice(error: unknown): Notice {
  if (error instanceof FirebaseConfigError) {
    return CONFIG_ERROR_NOTICE
  }

  if (error instanceof FirebaseError) {
    const known = AUTH_ERROR_NOTICES[error.code]
    if (known) {
      return known
    }
    if (
      error.code.startsWith('auth/api-key') ||
      error.code === 'auth/invalid-api-key' ||
      error.code === 'auth/configuration-not-found'
    ) {
      return CONFIG_ERROR_NOTICE
    }
  }

  return {
    message: 'Google sign-in failed. Please try again.',
    severity: 'error',
  }
}
