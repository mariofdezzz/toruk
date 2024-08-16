// import { assertEquals, assertExists, assertInstanceOf } from 'assert'
// import { assertSpyCall, assertSpyCalls, spy } from 'mock'

// import { jwt } from '../../middlewares/mod.ts'
// import { Middleware } from '../../mod.ts'

// const secret = 'your-256-bit-secret'
// const auth =
// 	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// Deno.test('Middleware should be a function', () => {
// 	const middleware = jwt({
// 		secret,
// 	})

// 	assertExists(middleware)
// 	assertInstanceOf(middleware, Function)
// })

// Deno.test('Middleware should return a response', async () => {
// 	const middleware = jwt({
// 		secret,
// 	})
// 	const middlewareParams: Parameters<Middleware>[0] = {
// 		next: () => new Response(),
// 		request: new Request('http://localhost'),
// 		info: {
// 			remoteAddr: {
// 				transport: 'tcp',
// 				hostname: 'localhost',
// 				port: 80,
// 			},
// 			completed: Promise.resolve(),
// 		},
// 		params: {},
// 	}

// 	const response = await middleware(middlewareParams)

// 	assertExists(response)
// 	assertInstanceOf(response, Response)
// })

// Deno.test('Middleware should execute next if Authorization header is valid', async () => {
// 	const middleware = jwt({
// 		secret,
// 	})
// 	const nextSpy = spy(() => new Response())
// 	const middlewareParams: Parameters<Middleware>[0] = {
// 		next: nextSpy,
// 		request: new Request('http://localhost', {
// 			headers: {
// 				Authorization: auth,
// 			},
// 		}),
// 		info: {
// 			remoteAddr: {
// 				transport: 'tcp',
// 				hostname: 'localhost',
// 				port: 80,
// 			},
// 			completed: Promise.resolve(),
// 		},
// 		params: {},
// 	}

// 	const response = await middleware(middlewareParams)

// 	assertExists(response)
// 	assertInstanceOf(response, Response)
// 	assertEquals(response.status, 200)
// 	assertSpyCall(nextSpy, 0, {
// 		returned: response,
// 	})
// 	assertSpyCalls(nextSpy, 1)
// })
