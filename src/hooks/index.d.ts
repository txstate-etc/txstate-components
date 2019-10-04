import { HandlerFunction, NextFunction } from '../utils'

export type UseEventHook = (event: string, handler: HandlerFunction) => NextFunction

export const useEvent: UseEventHook
