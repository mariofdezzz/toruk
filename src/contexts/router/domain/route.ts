import type { RouteWithChildren } from './route-with-chidren.ts'
import type { RouteWithHandler } from './route-with-handler.ts'

export type Route<Path extends string = string> =
	| RouteWithHandler<Path>
	| RouteWithChildren<Path>
