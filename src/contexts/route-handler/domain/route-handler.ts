import { RouteHandlerArgs } from './route-handler-args.ts'

export type RouteHandler<
	Path extends string = string,
	Uses extends Record<string, unknown>[] = [],
> = (
	args: RouteHandlerArgs<Path, Uses>,
) => Response | Promise<Response>
