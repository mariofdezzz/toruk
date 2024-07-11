import type { AppConfig } from '../contexts/app/domain/app-config.ts'
import type { Middleware } from '../contexts/router/domain/middleware.ts'
import type { RouteHandler } from '../contexts/router/domain/route-handler.ts'
import { Router } from './router.ts'

export class App<T extends Array<string>> {
	private readonly router: Router<T>

	constructor({ router }: AppConfig<T> = {}) {
		if (router instanceof Router) {
			this.router = router
		} else {
			this.router = new Router(router)
		}
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
		this.router.get(path, middlewares, handler)

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
		this.router.post(path, middlewares, handler)

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
		this.router.put(path, middlewares, handler)

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
		this.router.patch(path, middlewares, handler)

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
		this.router.delete(path, middlewares, handler)

		return this
	}

	use(middleware: Middleware): this {
		this.router.use(middleware)

		return this
	}

	serve(): Deno.HttpServer<Deno.NetAddr>
	serve(options: Deno.ServeOptions): Deno.HttpServer<Deno.NetAddr>
	serve(options?: Deno.ServeOptions): Deno.HttpServer<Deno.NetAddr> {
		const handler = this.router.toHandler()

		if (options) return Deno.serve(options, handler)

		return Deno.serve(handler)
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
