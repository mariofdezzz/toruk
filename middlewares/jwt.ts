import { Middleware } from '@/router/domain/middleware.ts'
import { decodeBase64Url } from 'std/encoding/base64url.ts'
import { ALGORITHMS } from '~/jwt/algorithms.ts'
import { getTokenFromCookie } from '~/jwt/get-token-from-cookie.ts'
import { getTokenFromHeader } from '~/jwt/get-token-from-header.ts'

export type JwtOptions = {
	secret?: string
	cookie?: string
	algorithm?: keyof typeof ALGORITHMS
}

export function jwt(options: JwtOptions = {}): Middleware {
	const {
		secret = Deno.env.get('JWT_SECRET'),
		cookie,
		algorithm = 'HS256',
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
			const { header, payload, signature } = token

			const verified = await crypto.subtle.verify(
				'HMAC',
				await key,
				decodeBase64Url(signature),
				new TextEncoder().encode([header, payload].join('.')),
			)

			if (verified) return await next()
		}

		return new Response('Unauthorized', { status: 401 })
	}
}
