import { Route } from '../../route/domain/route.ts'

export type FlatRoute =
  & Omit<Route, 'children'>
  & Required<Pick<Route, 'handler'>>
