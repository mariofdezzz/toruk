export function getTokenFromHeader(request: Request): string | null {
	const auth = request.headers.get('Authorization')

	if (auth) {
		const [type, token] = auth.split(' ')

		if (['Bearer', 'Basic'].includes(type)) {
			return token
		}
	}

	return null
}
