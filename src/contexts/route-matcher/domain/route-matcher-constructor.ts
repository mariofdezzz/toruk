import { Middleware } from '../../middleware/domain/middleware.ts'
import { Route } from '../../route/domain/route.ts'
import { RouteMatcher } from './route-matcher.ts'

export interface RouteMatcherConstructor {
  new (routes: Route[], use?: Middleware[]): RouteMatcher
}
