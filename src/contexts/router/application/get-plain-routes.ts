import type { Middleware } from '../../middleware/domain/middleware.ts'
import type { Route } from '../../route/domain/route.ts'
import type { PlainRoute } from '../domain/plain-route.ts'

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
		const fullpath = (parent?.path ?? '') + path

		const plainRoute: PlainRoute | undefined = handler
			? {
				pattern: new URLPattern({
					pathname: fullpath,
				}),
				handler,
				methods: method ? [method] : methods ?? ['GET'],
				middelwares,
			}
			: undefined
		const extra: PlainRoute[] = children !== undefined && children.length > 0
			? _getPlainRoutes(children, { path: fullpath, middelwares })
			: []

		return [
			plainRoute,
			...extra,
		]
	}).flat().filter((route): route is PlainRoute => route !== undefined)

	return plainRoutes
}
