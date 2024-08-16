import { join } from '../../../deps.ts'
import { Middleware } from '../../middleware/domain/middleware.ts'
import { Route } from '../../route/domain/route.ts'
import { FlatRoute } from '../domain/flat-route.ts'

export function flattenRoutes(routes: Route[], use: Middleware[]): FlatRoute[] {
  return _flattenRoutes(routes, { use })
}

function _flattenRoutes(routes: Route[], parent: {
  path?: string
  use?: Middleware[]
} = {}): FlatRoute[] {
  const {
    path: parentPath = '',
    use: parentUse = [],
  } = parent

  const flatRoutes = routes.map((route) => {
    const {
      path,
      handler,
      method,
      methods,
      children,
      use: routeUse = [],
    } = route
    const fullpath = join(parentPath, path.length > 0 ? path : '/')
    const use = parentUse.concat(routeUse)

    const flatRoute: FlatRoute = {
      path: fullpath,
      handler: handler!,
      method,
      methods,
      use,
    }

    const childrenRoutes = children !== undefined && children.length > 0
      ? _flattenRoutes(children, { path: fullpath, use })
      : []

    return [
      flatRoute,
      ...childrenRoutes,
    ]
  }).flat().filter((route): route is FlatRoute => route.handler !== undefined)

  return flatRoutes
}
