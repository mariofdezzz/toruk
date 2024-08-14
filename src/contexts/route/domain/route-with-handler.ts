import { PartialBy } from '../../shared/domain/partial-by.ts'
import { GenericRoute } from './generic-route.ts'

export type RouteWithHandler<Path extends string = string> = PartialBy<
	GenericRoute<Path>,
	'children'
>
const a: RouteWithHandler<'/test/:id'> = {
	path: '/test/:id',
	handler: ({ params: { id } }) => new Response(),
}
