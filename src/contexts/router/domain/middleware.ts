import { MiddlewareNextFunction } from './middleware-next-function.ts'
import { RouteParams } from './route-params.ts'

export type Middleware = (args: {
	request: Request
	info: Deno.ServeHandlerInfo
	params: RouteParams<any>
	next: MiddlewareNextFunction
}) => Response | Promise<Response>
