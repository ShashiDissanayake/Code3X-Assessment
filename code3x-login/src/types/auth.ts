export interface AuthSession {
  /** Firebase ID token (JWT) returned by `user.getIdToken()`. */
  accessToken: string
  displayName: string | null
  email: string | null
  photoURL: string | null
}
