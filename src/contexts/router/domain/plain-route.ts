import type { Middleware } from './middleware.ts'
import type { RouteHandler } from './route-handler.ts'
import type { RouteMethod } from './route-method.ts'

export interface PlainRoute {
	pattern: URLPattern
	handler: RouteHandler
	methods: RouteMethod[]
	middelwares: Middleware[]
}
