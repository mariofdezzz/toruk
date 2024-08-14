import type { RouteParams } from '../../route-params/domain/route-params.ts'
import type { MiddlewareNextFunction } from './middleware-next-function.ts'

export type Middleware<
	T extends Record<string, unknown> = {},
> = (args: {
	request: Request
	info: Deno.ServeHandlerInfo
	params: RouteParams<any>
	next: MiddlewareNextFunction<T>
}) => Response | Promise<Response>
