import { PartialBy } from '../../shared/domain/partial-by.ts'
import { GenericRoute } from './generic-route.ts'

export type RouteWithHandler<
	Path extends string = string,
	Uses extends Record<string, unknown>[] = [],
> = PartialBy<
	GenericRoute<Path, Uses>,
	'children'
>
