import { findRoute } from '../contexts/router/application/find-route.ts'
import { getDefaultResponse } from '../contexts/router/application/get-default-response.ts'
import { getPlainRoutes } from '../contexts/router/application/get-plain-routes.ts'
import { linkMiddlewaresToHandler } from '../contexts/router/application/link-middlewares.ts'
import type { Middleware } from '../contexts/router/domain/middleware.ts'
import type { RouteHandler } from '../contexts/router/domain/route-handler.ts'
import type { Route } from '../contexts/router/domain/route.ts'
import type { RouterConfig } from '../contexts/router/domain/router-config.ts'

export class Router<T extends Array<string>> {
	private readonly routes: Route[] = []
	private readonly middlewares: Middleware[] = []

	constructor({ routes, use }: RouterConfig<T> = {}) {
		if (routes) this.routes = routes
		if (use) this.middlewares = use
	}

	get<T extends string>(path: T, handler: RouteHandler<T>): this
	get<T extends string>(
		path: T,
		use: Middleware[],
		handler: RouteHandler<T>,
	): this
	get(
		path: string,
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): this {
		const [middlewares, handler] = this.getParams(
			middlewaresOrHandler,
			maybeHandler,
		)
		this.routes.push({ path, handler, use: middlewares })

		return this
	}

	post<T extends string>(path: T, handler: RouteHandler<T>): this
	post<T extends string>(
		path: T,
		use: Middleware[],
		handler: RouteHandler<T>,
	): this
	post(
		path: string,
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): this {
		const [middlewares, handler] = this.getParams(
			middlewaresOrHandler,
			maybeHandler,
		)
		this.routes.push({ path, handler, use: middlewares, method: 'POST' })

		return this
	}

	put<T extends string>(path: T, handler: RouteHandler<T>): this
	put<T extends string>(
		path: T,
		use: Middleware[],
		handler: RouteHandler<T>,
	): this
	put(
		path: string,
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): this {
		const [middlewares, handler] = this.getParams(
			middlewaresOrHandler,
			maybeHandler,
		)
		this.routes.push({ path, handler, use: middlewares, method: 'PUT' })

		return this
	}

	patch<T extends string>(path: T, handler: RouteHandler<T>): this
	patch<T extends string>(
		path: T,
		use: Middleware[],
		handler: RouteHandler<T>,
	): this
	patch(
		path: string,
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): this {
		const [middlewares, handler] = this.getParams(
			middlewaresOrHandler,
			maybeHandler,
		)
		this.routes.push({ path, handler, use: middlewares, method: 'PATCH' })

		return this
	}

	delete<T extends string>(path: T, handler: RouteHandler<T>): this
	delete<T extends string>(
		path: T,
		use: Middleware[],
		handler: RouteHandler<T>,
	): this
	delete(
		path: string,
		middlewaresOrHandler: Middleware[] | RouteHandler,
		maybeHandler?: RouteHandler,
	): this {
		const [middlewares, handler] = this.getParams(
			middlewaresOrHandler,
			maybeHandler,
		)
		this.routes.push({ path, handler, use: middlewares, method: 'DELETE' })

		return this
	}

	use(middleware: Middleware): this {
		this.middlewares.push(middleware)

		return this
	}

	toHandler(): Deno.ServeHandler {
		const plainRoutes = getPlainRoutes(this.routes, this.middlewares)

		return async (request, info) => {
			const found = findRoute(request, plainRoutes)

			if (!found) return getDefaultResponse()
			const { handler, params, middelwares } = found

			const next = linkMiddlewaresToHandler(
				handler,
				middelwares,
				{ request, info, params },
			)

			return await next()
		}
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
}
