import type { Middleware } from '../domain/middleware.ts'
import type { PlainRoute } from '../domain/plain-route.ts'
import type { Route } from '../domain/route.ts'

/**
 * Precumpute routes
 */
export function getPlainRoutes(
	routes: Route[],
	middelwares?: Middleware[],
): PlainRoute[] {
	return _getPlainRoutes(routes, { path: '', middelwares })
}

function _getPlainRoutes(
	routes: Route[],
	parent?: {
		path: string
		middelwares?: Middleware[]
	},
): PlainRoute[] {
	const _parentMiddlewares = parent?.middelwares ?? []

	const plainRoutes = routes.map((route) => {
		const { path, handler, method, methods, children, use } = route
		const middelwares = _parentMiddlewares.concat(use ?? [])

		const plainRoute: PlainRoute = {
			pattern: new URLPattern({
				pathname: (parent?.path ?? '') + path,
			}),
			handler,
			methods: method ? [method] : methods ?? ['GET'],
			middelwares,
		}
		const extra: PlainRoute[] = children !== undefined && children.length > 0
			? _getPlainRoutes(children, { path, middelwares })
			: []

		return [
			plainRoute,
			...extra,
		]
	}).flat()

	return plainRoutes
}
