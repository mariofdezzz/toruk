import type {
	AppConfigRaw,
	AppConfigRouterInstance,
} from '../contexts/app/domain/app-config.ts'
import { AppInterface } from '../contexts/app/domain/app-interface.ts'
import type { Middleware } from '../contexts/middleware/domain/middleware.ts'
import { RouteHandler } from '../contexts/route-handler/route-handler.ts'
import { Router } from './router.ts'

export class App<T extends Array<string>> implements AppInterface {
	private readonly router: Router<T>

	constructor(config?: AppConfigRaw<T>)
	constructor(config?: AppConfigRouterInstance<T>)
	constructor({ router }: AppConfigRouterInstance<T> | AppConfigRaw<T> = {}) {
		if (router instanceof Router) {
			this.router = router
		} else {
			this.router = new Router(router)
		}
	}

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
