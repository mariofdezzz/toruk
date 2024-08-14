export type MiddlewareNextFunction<
  T extends Record<string, unknown> = Record<string, never>,
> = (
  payload: T,
) => Response | Promise<Response>
