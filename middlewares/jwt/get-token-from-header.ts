import { RawToken } from './raw-token.ts'

export function getTokenFromHeader(request: Request): RawToken | null {
	const auth = request.headers.get('Authorization')

	if (auth) {
		const [type, token] = auth.split(' ')

		if (['Bearer', 'Basic'].includes(type)) {
			const [header, payload, signature] = token.split('.')

			return {
				header,
				payload,
				signature,
			}
		}
	}

	return null
}
