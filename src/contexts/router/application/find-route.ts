import type { Middleware } from '../domain/middleware.ts'
import type { PlainRoute } from '../domain/plain-route.ts'
import type { RouteHandler } from '../domain/route-handler.ts'
import type { RouteMethod } from '../domain/route-method.ts'
import type { RouteParams } from '../domain/route-params.ts'

export function findRoute(
	request: Request,
	routes: PlainRoute[],
):
	| {
		handler: RouteHandler
		params: RouteParams<any>
		middelwares: Middleware[]
	}
	| undefined {
	for (const { pattern, handler, methods, middelwares } of routes) {
		const match = pattern.exec(request.url)
		const params = match?.pathname.groups ?? {} as any

		if (match && methods.includes(request.method as RouteMethod)) {
			return { handler, params, middelwares }
		}
	}
}
