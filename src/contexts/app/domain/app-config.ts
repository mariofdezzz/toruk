import { RouterConfig } from '@/router/domain/router-config.ts'
import { Router } from '../../../app/router.ts'

export type AppConfig<T extends Array<string>> = {
	router?: Router<T> | RouterConfig<T>
}
