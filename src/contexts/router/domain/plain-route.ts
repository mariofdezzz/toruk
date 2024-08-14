import type { Middleware } from '../../middleware/domain/middleware.ts'
import type { RouteHandler } from '../../route-handler/domain/route-handler.ts'
import type { RouteMethod } from '../../route-method/domain/route-method.ts'

export interface PlainRoute {
	pattern: URLPattern
	handler: RouteHandler
	methods: RouteMethod[]
	middelwares: Middleware[]
}
