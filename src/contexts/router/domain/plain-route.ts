import { Middleware } from './middleware.ts'
import { RouteHandler } from './route-handler.ts'
import { RouteMethod } from './route-method.ts'

export interface PlainRoute {
	pattern: URLPattern
	handler: RouteHandler
	methods: RouteMethod[]
	middelwares: Middleware[]
}
