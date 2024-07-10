import { findRoute } from '@/router/application/find-route.ts'
import { getDefaultResponse } from '@/router/application/get-default-response.ts'
import { getPlainRoutes } from '@/router/application/get-plain-routes.ts'
import { linkMiddlewaresToHandler } from '@/router/application/link-middlewares.ts'
import { Middleware } from '@/router/domain/middleware.ts'
import { RouteHandler } from '@/router/domain/route-handler.ts'
import { Route } from '@/router/domain/route.ts'
import { RouterConfig } from '@/router/domain/router-config.ts'

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
