import { MiddlewareNextFunction } from '../../middleware/domain/middleware-next-function.ts'
import { Middleware } from '../../middleware/domain/middleware.ts'
import { RouteHandler } from '../../route-handler/domain/route-handler.ts'
import { RouteParams } from '../../route-params/domain/route-params.ts'

export function linkMiddlewaresToHandler(
	handler: RouteHandler,
	middlewares: Middleware[],
	args: {
		request: Request
		info: Deno.ServeHandlerInfo
		params: RouteParams<any>
	},
): MiddlewareNextFunction {
	const next = (middlewareArgs: Record<string, unknown> = {}) =>
		handler({ ...middlewareArgs, ...args })

	if (middlewares.length === 0) return next

	return middlewares.reduce<MiddlewareNextFunction>(
		(next, middleware) => {
			return ((middlewareArgs: Record<string, unknown> = {}) =>
				middleware({ ...middlewareArgs, ...args, next }))
		},
		next,
	)
}
