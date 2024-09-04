export type UseJWT<Payload extends Record<string, unknown> = {}> = {
  jwt: {
    payload: Payload
  }
}
