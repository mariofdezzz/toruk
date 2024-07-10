import { MiddlewareNextFunction } from '../domain/middleware-next-function.ts'
import { Middleware } from '../domain/middleware.ts'
import { RouteHandler } from '../domain/route-handler.ts'
import { RouteParams } from '../domain/route-params.ts'

export function linkMiddlewaresToHandler(
	handler: RouteHandler,
	middlewares: Middleware[],
	args: {
		request: Request
		info: Deno.ServeHandlerInfo
		params: RouteParams<any>
	},
): MiddlewareNextFunction {
	const next = () => handler(args)

	if (middlewares.length === 0) return next

	return middlewares.reduce<MiddlewareNextFunction>(
		(next, middleware) => {
			return (() => middleware({ ...args, next }))
		},
		next,
	)
}
