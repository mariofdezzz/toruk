import { Middleware } from '@/router/domain/middleware.ts'
import { PlainRoute } from '@/router/domain/plain-route.ts'
import { RouteHandler } from '@/router/domain/route-handler.ts'
import { RouteMethod } from '@/router/domain/route-method.ts'
import { RouteParams } from '@/router/domain/route-params.ts'

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
