import type { ConnInfo, Handler } from '../deps.ts';

export interface RouterInit {
	// deno-lint-ignore no-explicit-any
	routes?: Route<any>[];
	defaultResponse?: Response;
}

export interface Route<T = DefaultHandlerParams> {
	path: string;
	handler: RouteHandler<T>;
	method?: string;
	children?: Route[];
}

export type RouteHandler<T = DefaultHandlerParams> = (
	{}: { req: Request; conn: ConnInfo; params: T },
) => Response | Promise<Response>;

export type DefaultHandlerParams = Record<string, string>;

export type RouteAsFunction<T = DefaultHandlerParams> = (
	path: string,
	handler: RouteHandler<T>,
) => IRouter;

// Internal types
export interface IRouter {
	get: RouteAsFunction;
	post: RouteAsFunction;
	put: RouteAsFunction;
	patch: RouteAsFunction;
	delete: RouteAsFunction;

	toHandler(): Handler;
}

export interface PlainRoute<T> {
	pattern: URLPattern;
	handler: RouteHandler<T>;
	method?: string;
}
