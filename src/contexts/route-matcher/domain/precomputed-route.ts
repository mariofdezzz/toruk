import { RouteHandler } from '../../route-handler/domain/route-handler.ts'
import type { RouteMethod } from '../../route-method/domain/route-method.ts'

export interface PrecomputedRoute {
  pattern: URLPattern
  methods: RouteMethod[]
  execute: RouteHandler
}
