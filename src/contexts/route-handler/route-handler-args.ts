// deno-lint-ignore-file ban-types
import { RouteHandlerBaseArgs } from './route-handler-base-args.ts'

type RHAKeys = keyof RouteHandlerBaseArgs<string>

type MiddlewareJoin<T extends Record<string, unknown>[]> = T extends
  [infer First, ...infer Rest]
  ? First & MiddlewareJoin<Rest extends Record<string, unknown>[] ? Rest : []>
  : {}

export type RouteHandlerArgs<
  Path extends string = string,
  Uses extends Record<string, unknown>[] = [],
> =
  & RouteHandlerBaseArgs<Path>
  & Omit<MiddlewareJoin<Uses>, RHAKeys>
