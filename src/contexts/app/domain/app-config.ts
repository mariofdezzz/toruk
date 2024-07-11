import type { Router } from '../../../app/router.ts'
import type { RouterConfig } from '../../router/domain/router-config.ts'

export type AppConfig<T extends Array<string>> = {
	router?: Router<T> | RouterConfig<T>
}
