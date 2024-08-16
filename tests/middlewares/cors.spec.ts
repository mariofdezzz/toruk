import { assertExists, assertInstanceOf } from 'assert'
import { assertSpyCall, assertSpyCalls, spy } from 'mock'
import { cors } from '../../middlewares/mod.ts'
import { Middleware } from '../../mod.ts'

Deno.test('Middleware should be a function', () => {
	const middleware = cors()

	assertExists(middleware)
	assertInstanceOf(middleware, Function)
})

Deno.test('Middleware should return a response', async () => {
	const middleware = cors()
	const middlewareParams: Parameters<Middleware>[0] = {
		next: () => new Response(),
		request: new Request('http://localhost'),
		info: {
			remoteAddr: {
				transport: 'tcp',
				hostname: 'localhost',
				port: 80,
			},
			completed: Promise.resolve(),
		},
		params: {},
	}

	const response = await middleware(middlewareParams)

	assertExists(response)
	assertInstanceOf(response, Response)
})

Deno.test('Middleware should execute next', async () => {
	const middleware = cors()
	const nextSpy = spy(() => new Response())
	const middlewareParams: Parameters<Middleware>[0] = {
		next: nextSpy,
		request: new Request('http://localhost'),
		info: {
			remoteAddr: {
				transport: 'tcp',
				hostname: 'localhost',
				port: 80,
			},
			completed: Promise.resolve(),
		},
		params: {},
	}

	const response = await middleware(middlewareParams)

	assertSpyCall(nextSpy, 0, {
		returned: response,
	})
	assertSpyCalls(nextSpy, 1)
})
