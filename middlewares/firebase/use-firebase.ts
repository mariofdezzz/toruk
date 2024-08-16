import { FirebaseJWTPayload } from '../jwt/firebase/firebase-jwt-payload.ts'

export type UseFirebase<ExtraPayload extends Record<string, unknown> = {}> = {
  jwt: {
    payload: FirebaseJWTPayload & ExtraPayload
  }
}
