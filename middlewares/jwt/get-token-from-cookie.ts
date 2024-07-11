import { RawToken } from './raw-token.ts'

export function getTokenFromCookie(
	cookieName: string,
	request: Request,
): RawToken | null {
	const cookieHeader = request.headers.get('Cookie')

	if (cookieHeader) {
		const cookies = cookieHeader.split(';').map((cookie) => cookie.trim())
		const cookie = cookies.find((cookie) => cookie.startsWith(cookieName))

		if (cookie) {
			const [_, cookieValue] = cookie.split('=')
			const cookieValueDecoded = decodeURIComponent(cookieValue)

			const [header, payload, signature] = cookieValueDecoded.split('.')

			return {
				header,
				payload,
				signature,
			}
		}
	}

	return null
}
