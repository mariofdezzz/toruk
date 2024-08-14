import type { Middleware } from '../src/contexts/middleware/domain/middleware.ts'
import type { RouteHandler } from '../src/contexts/route-handler/domain/route-handler.ts'

type OriginFunction = (args: Parameters<RouteHandler>[0]) => string

export type CorsOptions = {
	origin?: string | string[] | OriginFunction
	methods?: string[]
	headers?: string[]
	maxAge?: number
	credentials?: boolean
	exposeHeaders?: string[]
}

export function cors(options: CorsOptions = {}): Middleware {
	const {
		origin = '*',
		methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
		headers = ['Content-Type', 'Authorization'],
		maxAge,
		credentials,
		exposeHeaders = [],
	} = options
	const _origin = typeof origin === 'string' ? [origin] : origin
	const getOrigin = typeof _origin === 'function'
		? _origin
		: (() => _origin.join(', '))

	return async function (args) {
		const { next } = args
		const response = await next()
		const origin = getOrigin(args)

		response.headers.set('Access-Control-Allow-Origin', origin)
		response.headers.set(
			'Access-Control-Allow-Methods',
			methods.join(', '),
		)
		response.headers.set(
			'Access-Control-Allow-Headers',
			headers.join(', '),
		)
		if (maxAge) {
			response.headers.set('Access-Control-Max-Age', String(maxAge))
		}
		if (credentials) {
			response.headers.set('Access-Control-Allow-Credentials', 'true')
		}
		if (exposeHeaders.length > 0) {
			response.headers.set(
				'Access-Control-Expose-Headers',
				exposeHeaders.join(', '),
			)
		}
		return response
	}
}
