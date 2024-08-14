export type RouteParams<T extends string> = Record<PathParams<T>, string>

type PathParams<T extends string> = T extends `/${infer U}/${infer V}`
	? SubpathParam<`/${U}`> | PathParams<`/${V}`>
	: SubpathParam<T>

type SubpathParam<T extends string> = T extends `/:${infer U}` ? U : never
