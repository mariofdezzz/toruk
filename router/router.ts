// deno-lint-ignore-file no-explicit-any
import type { Handler } from '../deps.ts';
import type {
	DefaultHandlerParams,
	IRouter,
	PlainRoute,
	Route,
	RouteHandler,
	RouterInit,
} from './types.ts';

/** Default router response. */
const routerDefaultResponse = new Response('Not Found', {
	status: 404,
});

/** Used to construct a route handler. */
export class Router implements IRouter {
	private routes: PlainRoute<any>[];
	private defaultResponse: Response;

	constructor({ routes = [], defaultResponse }: RouterInit = {}) {
		this.routes = this.getPlainRoutes(routes);

		this.defaultResponse = defaultResponse ?? routerDefaultResponse;
	}

	get<T = DefaultHandlerParams>(
		path: string,
		handler: RouteHandler<T>,
	): Router {
		this.addPlainRoute(path, handler, 'GET');

		return this;
	}

	post<T = DefaultHandlerParams>(
		path: string,
		handler: RouteHandler<T>,
	): Router {
		this.addPlainRoute(path, handler, 'POST');

		return this;
	}

	put<T = DefaultHandlerParams>(
		path: string,
		handler: RouteHandler<T>,
	): Router {
		this.addPlainRoute(path, handler, 'PUT');

		return this;
	}

	patch<T = DefaultHandlerParams>(
		path: string,
		handler: RouteHandler<T>,
	): Router {
		this.addPlainRoute(path, handler, 'PATCH');

		return this;
	}

	delete<T = DefaultHandlerParams>(
		path: string,
		handler: RouteHandler<T>,
	): Router {
		this.addPlainRoute(path, handler, 'DELETE');

		return this;
	}

	toHandler(): Handler {
		return (req, conn) => {
			for (const route of this.routes) {
				const match = route.pattern.exec(req.url);

				if (match && (!route.method || route.method === req.method)) {
					return route.handler({
						req,
						conn,
						params: match.pathname.groups,
					});
				}
			}

			return this.defaultResponse;
		};
	}

	private getPlainRoutes(
		data: Route | Route[],
		parentPath?: string,
	): PlainRoute<any>[] {
		if (Array.isArray(data)) {
			return data.map((route) => this.getPlainRoutes(route)).flat();
		}

		const { path, handler, method, children } = data;

		const extra: PlainRoute<any>[] =
			children?.map((child) => this.getPlainRoutes(child, path)).flat() ?? [];

		return [
			{
				pattern: new URLPattern({
					pathname: (parentPath ?? '') + path,
				}),
				handler,
				method,
			},
			...extra,
		];
	}

	private addPlainRoute<T>(
		path: string,
		handler: RouteHandler<T>,
		method?: string,
	): void {
		const route: PlainRoute<T> = {
			pattern: new URLPattern({
				pathname: path,
			}),
			handler,
			method,
		};

		this.routes.push(route);
	}
}
