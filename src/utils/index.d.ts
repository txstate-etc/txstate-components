import { BehaviorSubject } from "rxjs"
import { UsableSubject } from "../hooks"

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

export type DerivedSubjectTransform = <InputType, OutputType>(input:InputType) => OutputType
export interface IDerivedSubject<OutputType = any, InputType = any> extends BehaviorSubject<InputType> {
  new (subject:UsableSubject, transform:DerivedSubjectTransform<InputType, OutputType>): IDerivedSubject<OutputType, InputType>
}
export const DerivedSubject:IDerivedSubject
