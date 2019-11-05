import { HandlerFunction, NextFunction, DerivedSubjectTransform, DerivedSubjectMutate } from '../utils'
import { BehaviorSubject, Subject, Subscription } from 'rxjs'
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
}
export function useSubject <StateType = any, SubjectType extends UsableSubject = UsableSubject>(subject: SubjectType<StateType>): [StateType, (state:StateType) => void]
export function useSub <StateType = any, SubjectType extends UsableSubject = UsableSubject>(subject: SubjectType<StateType>): StateType
export function useSubFromContext <StateType = any, SubjectType extends UsableSubject = UsableSubject>(context: Context<SubjectType<StateType>>): StateType

export function useDerivedSubject <DerivedType = any, StateType = any, SubjectType extends UsableSubject = UsableSubject> (
  subject:SubjectType<StateType>,
  transform:DerivedSubjectTransform<StateType, DerivedType>,
  mutate:DerivedSubjectMutate<StateType, DerivedType>
): [DerivedType, (state:DerivedType) => void]
export function useDerivedSubject <DerivedType = any, StateType = any, SubjectType extends UsableSubject = UsableSubject> (
  subject:SubjectType<StateType>,
  accessor:string,
): [DerivedType, (state:DerivedType) => void]

export function useDerivedSubjectFromContext <DerivedType = any, StateType = any, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType<StateType>>,
  transform:DerivedSubjectTransform<StateType, DerivedType>,
  mutate:DerivedSubjectMutate<StateType, DerivedType>
): [DerivedType, (state:DerivedType) => void]
export function useDerivedSubjectFromContext <DerivedType = any, StateType = any, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType<StateType>>,
  accessor:string
): [DerivedType, (state:DerivedType) => void]

export function useDerivedSub <DerivedType = any, StateType = any, SubjectType extends UsableSubject = UsableSubject> (
  subject:SubjectType<StateType>,
  transform:DerivedSubjectTransform<StateType, DerivedType>
): DerivedType

export function UseDerivedSubFromContext <DerivedType = any, StateType = any, SubjectType extends UsableSubject = UsableSubject> (
  context:Context<SubjectType<StateType>>,
  transform:DerivedSubjectTransform<StateType, DerivedType>
): DerivedType
