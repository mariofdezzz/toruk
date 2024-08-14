import { Middleware } from '../../middleware/domain/middleware.ts'
import { RouteHandler } from '../../route-handler/route-handler.ts'

export interface RouterConfigChaining {
  get<T extends string>(path: T, handler: RouteHandler<T>): this
  get<T extends string>(
    path: T,
    use: Middleware[],
    handler: RouteHandler<T>,
  ): this

  post<T extends string>(path: T, handler: RouteHandler<T>): this
  post<T extends string>(
    path: T,
    use: Middleware[],
    handler: RouteHandler<T>,
  ): this

  put<T extends string>(path: T, handler: RouteHandler<T>): this
  put<T extends string>(
    path: T,
    use: Middleware[],
    handler: RouteHandler<T>,
  ): this

  patch<T extends string>(path: T, handler: RouteHandler<T>): this
  patch<T extends string>(
    path: T,
    use: Middleware[],
    handler: RouteHandler<T>,
  ): this

  delete<T extends string>(path: T, handler: RouteHandler<T>): this
  delete<T extends string>(
    path: T,
    use: Middleware[],
    handler: RouteHandler<T>,
  ): this

  use(middleware: Middleware): this
}
