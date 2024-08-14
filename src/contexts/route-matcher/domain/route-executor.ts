import { RouteParams } from '../../route-params/domain/route-params.ts'

export type RouteExecutor = (params: {
  request: Request
  info: Deno.ServeHandlerInfo
  params: RouteParams<any>
}) => Response | Promise<Response>
