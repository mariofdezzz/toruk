import type { Handler } from 'http';
import type { IRouter, PlainRoute, Route, RouterInit } from './types.ts';

/** Default router response. */
const routerDefaultResponse = new Response('Not Found', {
	status: 404,
});

/** Used to construct a route handler. */
export class Router implements IRouter {
	private routes: PlainRoute[];
	private defaultResponse: Response;

	constructor({ routes = [], defaultResponse }: RouterInit = {}) {
		this.routes = this.getPlainRoutes(routes);

		this.defaultResponse = defaultResponse ?? routerDefaultResponse;
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
	): PlainRoute[] {
		if (Array.isArray(data)) {
			return data.map((route) => this.getPlainRoutes(route)).flat();
		}

		const { path, handler, method, children } = data;

		const extra: PlainRoute[] =
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
}
