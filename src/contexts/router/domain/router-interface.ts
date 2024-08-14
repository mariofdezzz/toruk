import { RouterConfigChaining } from './router-config-chainging.ts'

export interface RouterInterface extends RouterConfigChaining {
  toHandler(): Deno.ServeHandler
}
