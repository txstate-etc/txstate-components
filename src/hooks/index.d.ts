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

export function useDerivedSubjectFromContext <DerivedType = any, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType>,
  transform:(state:UsableSubjectStateType<SubjectType>)=>DerivedType,
  mutate:(derived:DerivedType)=>UsableSubjectStateType<SubjectType>
): [DerivedType, (state:DerivedType) => void]
export function useDerivedSubjectFromContext <Accessor extends keyof UsableSubjectStateType<SubjectType>, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType>,
  accessor:Accessor
): [UsableSubjectStateType<SubjectType>[Accessor], (state:UsableSubjectStateType<SubjectType>[Accessor]) => void]

export function useDerivedSub <DerivedType = any, SubjectType extends UsableSubject = UsableSubject> (
  subject:SubjectType,
  transform:(state:UsableSubjectStateType<SubjectType>)=>DerivedType
): DerivedType
export function useDerivedSub <Accessor extends keyof UsableSubjectStateType<SubjectType>, SubjectType extends UsableSubject = UsableSubject> (
  subject:SubjectType,
  accessor:Accessor
): UsableSubjectStateType<SubjectType>[Accessor]

export function UseDerivedSubFromContext <DerivedType = any, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType>,
  transform:(state:UsableSubjectStateType<SubjectType>)=>DerivedType
): DerivedType
export function UseDerivedSubFromContext <Accessor extends keyof UsableSubjectStateType<SubjectType>, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType>,
  accessor:Accessor
): UsableSubjectStateType<SubjectType>[Accessor]
