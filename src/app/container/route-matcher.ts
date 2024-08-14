import { LinearRouteMatcher } from '../../contexts/route-matcher/application/linear-route-matcher.ts'
import { RouteMatcherConstructor } from '../../contexts/route-matcher/domain/route-matcher-constructor.ts'

export const RouteMatcher: RouteMatcherConstructor = LinearRouteMatcher
