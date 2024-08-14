import { RouteHandler } from '../../route-handler/route-handler.ts'
import { RouteParams } from '../../route-params/domain/route-params.ts'

export type RouteMatchResult = {
  handler: RouteHandler
  params: RouteParams<string>
}
