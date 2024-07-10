import { assertExists, assertInstanceOf } from 'assert'
import { App } from '../src/app/app.ts'

Deno.test('Base App', () => {
	const app = new App()

	assertExists(app)
	assertInstanceOf(app, App)
})

Deno.test('App has get method', () => {
	const app = new App()

	assertExists(app.get)
	assertInstanceOf(app.get, Function)
})

Deno.test('App has post method', () => {
	const app = new App()

	assertExists(app.post)
	assertInstanceOf(app.post, Function)
})

Deno.test('App has put method', () => {
	const app = new App()

	assertExists(app.put)
	assertInstanceOf(app.put, Function)
})

Deno.test('App has patch method', () => {
	const app = new App()

	assertExists(app.patch)
	assertInstanceOf(app.patch, Function)
})

Deno.test('App has delete method', () => {
	const app = new App()

	assertExists(app.delete)
	assertInstanceOf(app.delete, Function)
})

Deno.test('App concat routes', () => {
	const app = new App()
		.get('/get', () => new Response())
		.post('/post', () => new Response())
		.put('/put', () => new Response())
		.patch('/patch', () => new Response())
		.delete('/delete', () => new Response())

	assertExists(app)
	assertInstanceOf(app, App)
})
