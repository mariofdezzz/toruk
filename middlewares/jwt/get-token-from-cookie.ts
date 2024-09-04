export function getTokenFromCookie(
	cookieName: string,
	request: Request,
): string | null {
	const cookieHeader = request.headers.get('Cookie')

	if (cookieHeader) {
		const cookies = cookieHeader.split(';').map((cookie) => cookie.trim())
		const cookie = cookies.find((cookie) => cookie.startsWith(cookieName))

		if (cookie) {
			const [_, cookieValue] = cookie.split('=')
			const cookieValueDecoded = decodeURIComponent(cookieValue)

			return cookieValueDecoded
		}
	}

	return null
}
