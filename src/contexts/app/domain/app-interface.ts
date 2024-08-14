import { RouterConfigChaining } from '../../router/domain/router-config-chainging.ts'

export interface AppInterface extends RouterConfigChaining {
  serve(): Deno.HttpServer<Deno.NetAddr>
  serve(options: Deno.ServeOptions): Deno.HttpServer<Deno.NetAddr>
}
