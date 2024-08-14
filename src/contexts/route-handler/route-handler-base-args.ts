import { RouteParams } from '../route-params/domain/route-params.ts'

export type RouteHandlerBaseArgs<Path extends string = string> = {
  request: Request
  info: Deno.ServeHandlerInfo
  params: RouteParams<Path>
}
