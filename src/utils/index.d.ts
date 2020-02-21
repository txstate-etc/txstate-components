import { BehaviorSubject } from 'rxjs'
import { UsableSubject, UsableStore } from '../hooks'

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

export interface StoreOptions {
  immutable?: boolean
}
export declare class Store<StateType> extends BehaviorSubject<StateType> {
  new (initialValue:StateType, options?:StoreOptions): Store<StateType>
}
export declare class DerivedStore<OutputType, InputType> extends BehaviorSubject<OutputType> {
  new (store:UsableStore<OutputType>, getter:(state:InputType) => OutputType, setter?: (newvalue:OutputType, state:InputType) => InputType): DerivedStore<OutputType, InputType>
  new <Selector extends keyof InputType>(store:UsableStore<InputType[Selector]>, selector:Selector): DerivedStore<InputType[Selector], InputType>
  new (store:UsableStore<OutputType>, selector:string): DerivedStore<OutputType, InputType>
}
