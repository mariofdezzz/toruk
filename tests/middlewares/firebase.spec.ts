import { assertEquals } from 'assert'
import { firebase } from '../../middlewares/firebase.ts'
import { UseFirebase } from '../../middlewares/firebase/use-firebase.ts'
import { App } from '../../src/app/app.ts'
import { RouteHandler } from '../../src/contexts/route-handler/domain/route-handler.ts'

Deno.test('Middleware should execute next', async () => {
  const middleware = firebase({ projectId: 'test' })
  const routehandler: RouteHandler<'/', [UseFirebase]> = ({ jwt }) => {
    assertEquals(jwt.payload.name, 'test')

    return new Response()
  }
  const app = new App({
    router: {
      routes: [
        {
          path: '/',
          handler: routehandler,
          use: [middleware],
        },
      ],
    },
  })
})
