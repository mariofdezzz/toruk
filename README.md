# Toruk

![Code Coverage](https://soft-deer-77.deno.dev/?last)

Deno router fast, lightweight, close to runtime best practices.
The easiest way to enjoy Deno.

## Getting Started

```ts
import { App } from 'https://deno.land/x/toruk/mod.ts'

new App()
 .get('/', () => new Response('Hello World'))
 .get('/users/:id', ({ params }) => new Response(`User ${params.id}`))
 .serve()
```

Path uses [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern/URLPattern) matching.

Handler functions follow the same signature as [Deno's serve handler](https://deno.land/api@v1.44.4?s=Deno.ServeHandler).

```ts
import { App } from 'https://deno.land/x/toruk/mod.ts'

new App()
 .post('/users/:id/posts', async ({ request, info, params }) => {
  const body = await request.json()

  return new Response(`Post ${body.id} created for user ${params.id}`)
 })
 .serve()
```

## Alternative Syntaxes

### Object

```ts
import { App } from 'https://deno.land/x/toruk/mod.ts'

new App({
 router: {
  routes: [
   {
    path: '/',
    handler: () => new Response('Hello World'),
    children: [
     {
      path: 'users/:id',
      handler: ({ params }) => new Response(`User ${params.id}`),
     },
    ],
   },
  ],
 },
})
 .serve()
```

## Middlewares

```ts
import { App } from 'https://deno.land/x/toruk/mod.ts'
import { cors } from 'https://deno.land/x/toruk/middlewares/mod.ts'

new App()
 .use(cors())
 .get('/', () => new Response('Hello World'))
 .serve()
```
