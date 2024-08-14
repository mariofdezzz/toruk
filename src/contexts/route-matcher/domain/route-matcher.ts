import { RouteMatchResult } from './route-match-result.ts'

export interface RouteMatcher {
  match(url: string, method: string): RouteMatchResult | undefined
}
