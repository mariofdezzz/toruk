import { assertEquals } from 'assert'
import { firebase } from '../../middlewares/firebase.ts'
import { UseFirebase } from '../../middlewares/firebase/use-firebase.ts'
import { RouteHandler } from '../../mod.ts'
import { App } from '../../src/app/app.ts'

type UseFirebaseGmail = UseFirebase<{
  email: string
  name: string
  picture: string
  user_id: string
  email_verified: boolean
}>

Deno.test('Middleware should execute next', async () => {
  const middleware = firebase({ projectId: 'test' })
  const routehandler: RouteHandler<'/', [UseFirebaseGmail]> = ({ jwt }) => {
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
