export type FirebaseJWTPayload = {
  iss: string
  sub: string
  aud: string
  iat: number
  exp: number
  uid: string
}
