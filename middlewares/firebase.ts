import { Middleware } from '../src/contexts/middleware/domain/middleware.ts'
import { FirebaseJWTConfig } from './jwt/firebase/firebase-jwt-config.ts'
import { FirebaseJWTPayload } from './jwt/firebase/firebase-jwt-payload.ts'
import { FirebaseJWT } from './jwt/firebase/firebase-jwt.ts'
import { getTokenFromHeader } from './jwt/get-token-from-header.ts'

export function firebase<
  P extends Record<string, unknown> = {},
>(config: FirebaseJWTConfig): Middleware<{
  payload: FirebaseJWTPayload & P
}> {
  return async function ({ request, next }) {
    const token = getTokenFromHeader(request)

    if (token) {
      const firebaseJwt = new FirebaseJWT<FirebaseJWTPayload & P>(config, token)

      try {
        await firebaseJwt.verify()

        return await next({ payload: firebaseJwt.payload })
        // deno-lint-ignore no-empty
      } catch {}
    }

    return new Response('Unauthorized', { status: 401 })
  }
}
