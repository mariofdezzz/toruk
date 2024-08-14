import type { Middleware } from '../../middleware/domain/middleware.ts'
import type { Route } from '../../route/domain/route.ts'

export type RouteArray<T> = {
	[K in keyof T]: T[K] extends string ? Route<T[K]> : never
}

export type RouterConfig<T extends string[]> = {
	routes?: RouteArray<T>
	use?: Middleware[]
}
