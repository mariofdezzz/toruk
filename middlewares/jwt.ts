import type { Middleware } from '../src/contexts/middleware/domain/middleware.ts'
import { ALGORITHMS } from './jwt/algorithms.ts'
import { getTokenFromCookie } from './jwt/get-token-from-cookie.ts'
import { getTokenFromHeader } from './jwt/get-token-from-header.ts'
import { JWT } from './jwt/jwt.ts'

export * from './jwt/use-jwt.ts'

export type JwtOptions = {
	secret: string
	cookie?: string
	algorithm?: keyof typeof ALGORITHMS
	verify?: string[]
}

export function jwt(options: JwtOptions): Middleware {
	const {
		secret,
		cookie,
		algorithm = 'HS256',
		verify = [],
	} = options
	const importKeyAlgorithm = ALGORITHMS[algorithm]

	const key = crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(secret),
		importKeyAlgorithm,
		false,
		['verify'],
	)

	return async function ({ request, next }) {
		const token = cookie
			? getTokenFromCookie(cookie, request)
			: getTokenFromHeader(request)

		if (token) {
			let jwt: JWT | undefined
			let verified = false

			try {
				jwt = new JWT(token)
				verified = await jwt.verify(await key, verify)
				// deno-lint-ignore no-empty
			} catch {}

			if (verified) {
				return await next({
					jwt: {
						payload: jwt?.payload,
					},
				})
			}
		}

		return new Response('Unauthorized', { status: 401 })
	}
}
