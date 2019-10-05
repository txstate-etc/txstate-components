export type HandlerFunction = (...args: any[]) => void
export type SubscribeFunction = (event: string, handler: HandlerFunction) => void
export type UnsubscribeFunction = (event: string, handler: HandlerFunction) => void
export type NextFunction = (...args: any[]) => void

export interface ISubject {
  subscribe: SubscribeFunction
  unsubscribe: UnsubscribeFunction
  next: NextFunction
}

export const Subject: ISubject
