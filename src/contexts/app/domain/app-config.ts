import type { Router } from '../../../app/router.ts'
import { RouterConfig } from '../../router/domain/router-config.ts'

export type AppConfigRouterInstance<T extends string[]> = {
	router?: Router<T>
}

export type AppConfigRaw<T extends string[]> = {
	router?: RouterConfig<T>
}
