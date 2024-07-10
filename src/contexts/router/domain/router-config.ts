import { Middleware } from './middleware.ts'
import { Route } from './route.ts'

export type RouteArray<T> = {
	[K in keyof T]: T[K] extends string ? Route<T[K]> : never
}

export type RouterConfig<T extends Array<string>> = {
	routes?: RouteArray<T>
	use?: Middleware[]
}
