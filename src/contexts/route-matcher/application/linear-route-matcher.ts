import { Middleware } from '../../middleware/domain/middleware.ts'
import { RouteHandler } from '../../route-handler/route-handler.ts'
import { RouteMethod } from '../../route-method/domain/route-method.ts'
import { Route } from '../../route/domain/route.ts'
import { PrecomputedRoute } from '../domain/precomputed-route.ts'
import { RouteMatchResult } from '../domain/route-match-result.ts'
import { RouteMatcher } from '../domain/route-matcher.ts'
import { flattenRoutes } from './flatten-routes.ts'

export class LinearRouteMatcher implements RouteMatcher {
  private routes: PrecomputedRoute[] = []

  constructor(routes: Route[], use: Middleware[] = []) {
    this.prepare(routes, use)
  }

  match(url: string, method: RouteMethod): RouteMatchResult | undefined {
    const route = this.routes.find(
      ({ pattern, methods }) => pattern.test(url) && methods.includes(method),
    )

    if (route) {
      const { execute, pattern } = route
      const params = pattern.exec(url)?.pathname.groups ?? {}

      return { handler: execute, params }
    }
  }

  private prepare(routes: Route[], use: Middleware[]): void {
    const flat = flattenRoutes(routes, use)

    this.routes = flat.map((route) => {
      const { path, handler, method, methods, use } = route
      const pattern = new URLPattern({
        pathname: path,
      })
      const execute = this.buildHandler(handler, use)

      return {
        pattern,
        methods: methods ?? [method ?? 'GET'],
        execute,
      } satisfies PrecomputedRoute
    })
  }

  private buildHandler(
    handler: RouteHandler,
    use: Middleware[] = [],
  ): RouteHandler {
    const execute = use.reduce<RouteHandler>(
      (next, middleware) => (args) =>
        middleware({
          ...args,
          next: (payload) => next({ ...args, ...payload }),
        }),
      (args) => handler(args),
    )

    return execute
  }
}
