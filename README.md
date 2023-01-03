# Toruk
Deno std http router. Simple, close to the platform.

## Getting Started

Path uses [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern/URLPattern) matching.

```ts
import { serve } from 'https://deno.land/std/http/server.ts';
import { httpRouter } from 'https://deno.land/x/toruk/mod.ts';

const router = httpRouter({
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
});

serve(router);
```

## Alternative Syntaxes

### Export/Import workflow

`index.ts`

```ts
import { httpRouter } from 'https://deno.land/x/toruk/mod.ts';
import * as users from 'routes/users/:id.ts'

const router = httpRouter({
  routes: [
    users
  ]
});
```

`routes/users/:id.ts`

```ts
import { RouteHandler } from 'https://deno.land/x/toruk/mod.ts';

export const path = '/users/:id';

export const handler: RouteHandler<{ id: string }> = ({ params }) => {
  return new Response(`User ${params.id}`);
};
```
