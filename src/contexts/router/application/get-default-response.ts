export function getDefaultResponse(): Response {
	return new Response('Not Found', {
		status: 404,
	})
}
