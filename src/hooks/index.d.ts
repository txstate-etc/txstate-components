import { HandlerFunction, NextFunction } from '../utils'
import { BehaviorSubject } from 'rxjs'

export type UseEventHook = (event: string, handler?: HandlerFunction) => NextFunction
export const useEvent: UseEventHook

export type UseEventListener = (event: string, handler: (event: any) => void) => void
export const UseEventListener: UseEventListener

export interface IInitialValue {
  [key: string]: any
}

export interface IUseFormInputArgs {
  path: string
  extractor: (...args: any[]) => any
  transformer: (...args: any[]) => any
  initialValue: IInitialValue
}

export interface IUseFormInputResults {
  value: any
  onChange: (...args: any[]) => void
  error: string
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

export type UseSubject = <StateType = any>(subject: BehaviorSubject) => [StateType, (state:StateType) => void]
export const useSubject: UseSubject
