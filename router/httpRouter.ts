import type { Handler } from '../deps.ts';
import { Router } from './router.ts';
import { RouterInit } from './types.ts';

/** Shortcut to create a new router handler. */
export function httpRouter(init?: RouterInit): Handler {
	return new Router(init).toHandler();
}
