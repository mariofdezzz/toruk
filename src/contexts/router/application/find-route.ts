import type { Middleware } from '../../middleware/domain/middleware.ts'
import type { RouteHandler } from '../../route-handler/domain/route-handler.ts'
import type { RouteMethod } from '../../route-method/domain/route-method.ts'
import type { RouteParams } from '../../route-params/domain/route-params.ts'
import type { PlainRoute } from '../domain/plain-route.ts'

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
