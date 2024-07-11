import type { Middleware } from './middleware.ts'
import type { RouteHandler } from './route-handler.ts'
import type { RouteMethod } from './route-method.ts'

export interface Route<Path extends string = string> {
	/**
	 * Matching path. Avoid slash at the end.
	 */
	path: Path
	/**
	 * Handler function executed on match.
	 */
	handler: RouteHandler<Path>
	/**
	 * HTTP method to be matched. Defaults to GET.
	 */
	method?: RouteMethod
	/**
	 * HTTP methods to be matched. If method is provided, this will be ignored. Defaults to GET.
	 */
	methods?: RouteMethod[]
	/**
	 * Children routes. Allows to create nested routes.
	 */
	children?: Route<any>[] // FIXME
	/**
	 * Middleware to be executed before the handler.
	 */
	use?: Middleware[]
}
