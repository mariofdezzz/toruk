import type { Middleware } from '../contexts/middleware/domain/middleware.ts'
import { RouteHandler } from '../contexts/route-handler/domain/route-handler.ts'
import { RouteMatcher as RouteMatcherI } from '../contexts/route-matcher/domain/route-matcher.ts'
import { RouteMethod } from '../contexts/route-method/domain/route-method.ts'
import type { Route } from '../contexts/route/domain/route.ts'
import { getDefaultResponse } from '../contexts/router/application/get-default-response.ts'
import type { RouterConfig } from '../contexts/router/domain/router-config.ts'
import { RouterInterface } from '../contexts/router/domain/router-interface.ts'
import { RouteMatcher } from './container/route-matcher.ts'

export class Router<T extends Array<string>> implements RouterInterface {
	private readonly routes: Route[] = []
	private readonly middlewares: Middleware[] = []
	private routeMatcher: RouteMatcherI
	private readonly notFoundHandler: RouteHandler

	constructor({ routes, use }: RouterConfig<T> = {}) {
		if (routes) this.routes = routes
		if (use) this.middlewares = use
		this.routeMatcher = new RouteMatcher(this.routes, this.middlewares)
		this.notFoundHandler = this.buildHandler(
			getDefaultResponse,
			this.middlewares,
		)
	}

	get(
		path: string,
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): this {
		this.pushRoute(path, 'GET', middlewaresOrHandler, maybeHandler)

		return this
	}

	post(
		path: string,
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): this {
		this.pushRoute(path, 'POST', middlewaresOrHandler, maybeHandler)

		return this
	}

	put(
		path: string,
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): this {
		this.pushRoute(path, 'PUT', middlewaresOrHandler, maybeHandler)

		return this
	}

	patch(
		path: string,
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): this {
		this.pushRoute(path, 'PATCH', middlewaresOrHandler, maybeHandler)

		return this
	}

	delete(
		path: string,
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): this {
		this.pushRoute(path, 'DELETE', middlewaresOrHandler, maybeHandler)

		return this
	}

	use(middleware: Middleware): this {
		this.middlewares.push(middleware)

		return this
	}

	toHandler(): Deno.ServeHandler {
		return async (request, info) => {
			const match = this.routeMatcher.match(request.url, request.method)

			if (match) {
				const { handler, params } = match

				return await handler({ request, info, params })
			}

			return this.notFoundHandler({ request, info, params: {} })
		}
	}

	private pushRoute(
		path: string,
		method: RouteMethod,
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): void {
		const [middlewares, handler] = this.getParams(
			middlewaresOrHandler,
			maybeHandler,
		)
		this.routes.push({ path, handler, use: middlewares, method })
		this.routeMatcher = new RouteMatcher(this.routes, this.middlewares)
	}

	private getParams(
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): [Middleware[], RouteHandler] {
		const middlewares = Array.isArray(middlewaresOrHandler)
			? middlewaresOrHandler
			: []
		const handler = Array.isArray(middlewaresOrHandler)
			? maybeHandler!
			: middlewaresOrHandler

		return [middlewares, handler]
	}

	private buildHandler(
		handler: RouteHandler,
		use: Middleware[] = [],
	): RouteHandler {
		const execute = use.reduce<RouteHandler>(
			(next, middleware) => (args) =>
				middleware({
					...args,
					next: (payload) => next({ ...args, ...payload }),
				}),
			(args) => handler(args),
		)

		return execute
	}
}
