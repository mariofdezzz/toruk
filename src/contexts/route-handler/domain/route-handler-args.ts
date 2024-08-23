// deno-lint-ignore-file ban-types
import { RouteHandlerBaseArgs } from '../domain/route-handler-base-args.ts'

type RHBAKeys = keyof RouteHandlerBaseArgs<string>

type MiddlewareJoin<T extends Record<string, unknown>[]> = T extends
  [infer First, ...infer Rest]
  ? First & MiddlewareJoin<Rest extends Record<string, unknown>[] ? Rest : []>
  : {}

export type RouteHandlerArgs<
  Path extends string = string,
  Uses extends Record<string, unknown>[] = [],
> =
  & RouteHandlerBaseArgs<Path>
  & Omit<MiddlewareJoin<Uses>, RHBAKeys>
