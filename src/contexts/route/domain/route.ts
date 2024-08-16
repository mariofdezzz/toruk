import type { RouteWithChildren } from './route-with-chidren.ts'
import type { RouteWithHandler } from './route-with-handler.ts'

export type Route<
	Path extends string = string,
	Uses extends Record<string, unknown>[] = any[],
> =
	| RouteWithHandler<Path, Uses>
	| RouteWithChildren<Path, Uses>
