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
export type DerivedSubjectMutate = <InputType, OutputType>(value:OutputType, parentValue:InputType) => InputType
export interface IDerivedSubject<OutputType = any, InputType = any> extends BehaviorSubject<InputType> {
  new (subject:UsableSubject<OutputType>, accessor:string): IDerivedSubject<OutputType, InputType>
  new (subject:UsableSubject<OutputType>, transform:DerivedSubjectTransform<InputType, OutputType>, mutate?: DerivedSubjectMutate<InputType, OutputType>): IDerivedSubject<OutputType, InputType>
}
export const DerivedSubject:IDerivedSubject
