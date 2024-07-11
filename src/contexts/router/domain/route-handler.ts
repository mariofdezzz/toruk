import type { RouteParams } from './route-params.ts'

export type RouteHandler<T extends string = string> = (args: {
	request: Request
	info: Deno.ServeHandlerInfo
	params: RouteParams<T>
}) => Response | Promise<Response>
