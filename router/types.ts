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

// Internal types
export interface IRouter {
	toHandler(): Handler;
	// TODO: add get, post, put, delete methods
}

export interface PlainRoute {
	pattern: URLPattern;
	handler: RouteHandler;
	method?: string;
}
