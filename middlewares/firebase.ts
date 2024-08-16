import { Middleware } from '../src/contexts/middleware/domain/middleware.ts'
import { UseFirebase } from './firebase/use-firebase.ts'
import { FirebaseJWTConfig } from './jwt/firebase/firebase-jwt-config.ts'
import { FirebaseJWT } from './jwt/firebase/firebase-jwt.ts'
import { getTokenFromHeader } from './jwt/get-token-from-header.ts'

export * from './firebase/use-firebase.ts'

export function firebase(config: FirebaseJWTConfig): Middleware<UseFirebase> {
  return async function ({ request, next }) {
    const token = getTokenFromHeader(request)

    if (token) {
      const firebaseJwt = new FirebaseJWT<UseFirebase['jwt']['payload']>(
        config,
        token,
      )

      try {
        await firebaseJwt.verify()
        // deno-lint-ignore no-empty
      } catch {}

      return await next({
        jwt: {
          payload: firebaseJwt.payload,
        },
      })
    }

    return new Response('Unauthorized', { status: 401 })
  }
}
