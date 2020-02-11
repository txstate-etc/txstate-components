import { HandlerFunction, NextFunction } from '../utils'
import { Subscription, OperatorFunction, Observable } from 'rxjs'
import { Context } from 'react'

export type UseEventHook = (event: string, handler?: HandlerFunction) => NextFunction
export const useEvent: UseEventHook

export type UseEventListener = (event: string, handler: (event: any) => void) => void
export const UseEventListener: UseEventListener

export interface IUseFormInputArgs {
  path: string
  extractor?: (...args: any[]) => any
  transformer?: (...args: any[]) => any
  initialValue?: any
}

export interface IUseFormInputResults {
  value: any
  onChange: (...args: any[]) => void
  isDirty: boolean
  onBlur: Function
  error: string
  success: string
}

export type UseFormInput = (arg: IUseFormInputArgs) => IUseFormInputResults
export const useFormInput: UseFormInput

export interface IUseTableResult {
  onChangePage: (page: number, totalRows: number) => void,
  onChangeRowsPerPage: (pageSize: number, page: number) => void,
  onSort: (column: string, sortDirection: string) => void,
  paginationTotalRows: number,
  paginationPerPage: number,
  firstLoad: boolean,
  fetchData: Function,
  fetchingPage: boolean,
  data: any[]
}
export interface IData {
  total: number
  data: any[]
}
export interface IUseTableArgs {
  initialPageSize: number
  dataSource: (page: number, pageSize: number, sort: string) => Promise<IData>
}
export type UseTable = (arg: IUseTableArgs) => IUseTableResult
export const useTable: UseTable

/*** useSubject ***/
export interface UsableSubject<StateType = any> {
  value:StateType
  subscribe (observer:(value:StateType) => void): Subscription
  pipe(...operations: OperatorFunction<any, any>[]): Observable<any>
}
type UsableSubjectStateType<SubjectType> = SubjectType extends { value: infer StateType } ? StateType : never
export function useSubject <SubjectType extends UsableSubject = UsableSubject>(subject: SubjectType): [UsableSubjectStateType<SubjectType>, (state:UsableSubjectStateType<SubjectType>) => void]
export function useSub <SubjectType extends UsableSubject = UsableSubject>(subject: SubjectType): UsableSubjectStateType<SubjectType>
export function useSubFromContext <SubjectType extends UsableSubject = UsableSubject>(context: Context<SubjectType>): UsableSubjectStateType<SubjectType>

export function useDerivedSubject <DerivedType = any, SubjectType extends UsableSubject = UsableSubject> (
  subject:SubjectType,
  transform:(state:UsableSubjectStateType<SubjectType>)=>DerivedType,
  mutate:(derived:DerivedType)=>UsableSubjectStateType<SubjectType>
): [DerivedType, (state:DerivedType) => void]
export function useDerivedSubject <Accessor extends keyof UsableSubjectStateType<SubjectType>, SubjectType extends UsableSubject = UsableSubject> (
  subject:SubjectType,
  accessor:Accessor,
): [UsableSubjectStateType<SubjectType>[Accessor], (state:UsableSubjectStateType<SubjectType>[Accessor]) => void]
export function useDerivedSubject <DerivedType, SubjectType extends UsableSubject = UsableSubject> (
  subject:SubjectType,
  accessor:string,
): [DerivedType, (state:DerivedType) => void]

export function useDerivedSubjectFromContext <DerivedType = any, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType>,
  transform:(state:UsableSubjectStateType<SubjectType>)=>DerivedType,
  mutate:(derived:DerivedType)=>UsableSubjectStateType<SubjectType>
): [DerivedType, (state:DerivedType) => void]
export function useDerivedSubjectFromContext <Accessor extends keyof UsableSubjectStateType<SubjectType>, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType>,
  accessor:Accessor
): [UsableSubjectStateType<SubjectType>[Accessor], (state:UsableSubjectStateType<SubjectType>[Accessor]) => void]
export function useDerivedSubjectFromContext <DerivedType, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType>,
  accessor:string
): [DerivedType, (state:DerivedType) => void]

export function useDerivedSub <DerivedType, SubjectType extends UsableSubject = UsableSubject> (
  subject:SubjectType,
  transform:(state:UsableSubjectStateType<SubjectType>)=>DerivedType
): DerivedType
export function useDerivedSub <Accessor extends keyof UsableSubjectStateType<SubjectType>, SubjectType extends UsableSubject = UsableSubject> (
  subject:SubjectType,
  accessor:Accessor
): UsableSubjectStateType<SubjectType>[Accessor]
export function useDerivedSub <DerivedType, SubjectType extends UsableSubject = UsableSubject> (
  subject:SubjectType,
  accessor:string
): DerivedType

export function UseDerivedSubFromContext <DerivedType = any, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType>,
  transform:(state:UsableSubjectStateType<SubjectType>)=>DerivedType
): DerivedType
export function UseDerivedSubFromContext <Accessor extends keyof UsableSubjectStateType<SubjectType>, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType>,
  accessor:Accessor
): UsableSubjectStateType<SubjectType>[Accessor]
export function UseDerivedSubFromContext <DerivedType, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType>,
  accessor:string
): DerivedType

/*** useStore ***/
export interface UsableStore<StateType> {
  value:StateType
  subscribe (observer:(value:StateType) => void): Subscription
  pipe(...operations: OperatorFunction<any, any>[]): Observable<any>
}
export type UsableStoreStateType<StoreType> = StoreType extends { value: infer StateType } ? StateType : never
export function useAndUpdateStore <StoreType extends UsableStore>(subject: StoreType): [UsableStoreStateType<StoreType>, (state:UsableStoreStateType<StoreType>) => void]
export function useStore <StoreType extends UsableStore>(subject: StoreType): UsableStoreStateType<StoreType>
export function useStoreFromContext <StoreType extends UsableStore>(context: Context<StoreType>): UsableStoreStateType<StoreType>

export function useAndUpdateDerivedStore <DerivedType, StoreType extends UsableStore> (
  subject:StoreType,
  getter:(state:UsableStoreStateType<StoreType>)=>DerivedType,
  setter:(newvalue:DerivedType, state:UsableStoreStateType<StoreType>)=>UsableStoreStateType<StoreType>
): [DerivedType, (state:DerivedType) => void]
export function useAndUpdateDerivedStore <Selector extends keyof UsableStoreStateType<StoreType>, StoreType extends UsableStore> (
  subject:StoreType,
  selector:Selector,
): [UsableStoreStateType<StoreType>[Selector], (state:UsableStoreStateType<StoreType>[Selector]) => void]
export function useAndUpdateDerivedStore <DerivedType, StoreType extends UsableStore> (
  subject:StoreType,
  selector:string,
): [DerivedType, (state:DerivedType) => void]

export function useAndUpdateDerivedStoreFromContext <DerivedType, StoreType extends UsableStore> (
  context:Context<StoreType>,
  getter:(state:UsableStoreStateType<StoreType>)=>DerivedType,
  setter:(newvalue:DerivedType, state:UsableStoreStateType<StoreType>)=>UsableStoreStateType<StoreType>
): [DerivedType, (state:DerivedType) => void]
export function useAndUpdateDerivedStoreFromContext <Selector extends keyof UsableStoreStateType<StoreType>, StoreType extends UsableStore> (
  context:Context<StoreType>,
  selector:Selector
): [UsableStoreStateType<StoreType>[Selector], (state:UsableStoreStateType<StoreType>[Selector]) => void]
export function useAndUpdateDerivedStoreFromContext <DerivedType, StoreType extends UsableStore> (
  context:Context<StoreType>,
  selector:string
): [DerivedType, (state:DerivedType) => void]

export function useDerivedStore <DerivedType, StoreType extends UsableStore> (
  subject:StoreType,
  getter:(state:UsableStoreStateType<StoreType>)=>DerivedType
): DerivedType
export function useDerivedStore <Selector extends keyof UsableStoreStateType<StoreType>, StoreType extends UsableStore> (
  subject:StoreType,
  selector:Selector
): UsableStoreStateType<StoreType>[Selector]
export function useDerivedStore <DerivedType, StoreType extends UsableStore> (
  subject:StoreType,
  selector:string
): DerivedType

export function UseDerivedStoreFromContext <DerivedType, StoreType extends UsableStore> (
  context:Context<StoreType>,
  getter:(state:UsableStoreStateType<StoreType>)=>DerivedType
): DerivedType
export function UseDerivedStoreFromContext <Selector extends keyof UsableStoreStateType<StoreType>, StoreType extends UsableStore> (
  context:Context<StoreType>,
  selector:Selector
): UsableStoreStateType<StoreType>[Selector]
export function UseDerivedStoreFromContext <DerivedType, StoreType extends UsableStore> (
  context:Context<StoreType>,
  selector:string
): DerivedType
