import { PartialBy } from '../../shared/domain/partial-by.ts'
import { GenericRoute } from './generic-route.ts'

export type RouteWithChildren<Path extends string = string> = PartialBy<
	GenericRoute<Path>,
	'handler'
>
