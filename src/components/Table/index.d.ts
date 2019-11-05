import * as React from 'react';
import { Column, ComponentDecoratorProps } from 'react-table';

export interface TableColumns {
  name?: string;
  selector?: string;
  sortable?: boolean;
  format?: (...args: any[]) => any;
  cell?: any;
  right?: boolean;
  center?: boolean;
  grow?: number;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  ignoreRowClick?: boolean;
  button?: boolean;
  allowOverflow?: boolean;
  wrap?: boolean;
  hide?: number | "sm" | "md" | "lg";
}

interface WithSelectedAreaProps {
  refreshData: () => Promise<void>
}

export interface TableDataSourceResponse<ReturnType = any> {
  data: ReturnType[]
  total: number
}

enum SortDirection {
  NONE = 'none',
  ASC = 'asc',
  DESC = 'desc'
}

export type TableDataSourceFunction<ReturnType> = (page?:number, pageSize?:number, sort?:{ order?:SortDirection, selector:string }) => Promise<TableDataSourceResponse> | TableDataSourceResponse

export interface TableProps {
  columns?: TableColumns[];
  selectableRows?: boolean;
  selectableRowsDisabledField?: string
  dataSource?: TableDataSourceFunction
  onRowSelected?: (...args: any[]) => any | any;
  initialPageSize?: number;
  title?: string;
  keyField?: string;
  WithSelectedArea?: React.FC<WithSelectedAreaProps>;
}

export const Table: React.FC<TableProps>;

export declare enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
  NONE = 'none'
}

export interface ISort {
  order: SortOrder
  column: string
}

export interface IDataResponse<T> {
  list: T[]
  total: number
}

export type FetchFunction<T> = (page: number, pageSize: number, sort: ISort) => IDataResponse<T> | Promise<IDataResponse<T>>

export interface ReactTableProps {
  id?: string
  className?: string
  fetchData: FetchFunction<T>
  pageSize?: number
  showPageSizeOptions?: boolean
  showPageJump?: boolean
  columns: Column<T>[]
  getProps?: ComponentDecoratorProps.getProps
  getTableProps?: ComponentDecoratorProps.getTableProps
  getTheadGroupProps?: ComponentDecoratorProps.getTheadGroupProps
  getTheadGroupTrProps?: ComponentDecoratorProps.getTheadGroupTrProps
  getTheadGroupThProps?: ComponentDecoratorProps.getTheadGroupThProps
  getTheadProps?: ComponentDecoratorProps.getTheadProps
  getTheadTrProps?: ComponentDecoratorProps.getTheadTrProps
  getTheadThProps?: ComponentDecoratorProps.getTheadThProps
  getTheadFilterProps?: ComponentDecoratorProps.getTheadFilterProps
  getTheadFilterTrProps?: ComponentDecoratorProps.getTheadFilterTrProps
  getTheadFilterThProps?: ComponentDecoratorProps.getTheadFilterThProps
  getTbodyProps?: ComponentDecoratorProps.getTbodyProps
  getTrGroupProps?: ComponentDecoratorProps.getTrGroupProps
  getTrProps?: ComponentDecoratorProps.getTrProps
  getTdProps?: ComponentDecoratorProps.getTdProps
  getPaginationProps?: ComponentDecoratorProps.getPaginationProps
  getLoadingProps?: ComponentDecoratorProps.getLoadingProps
  getNoDataProps?: ComponentDecoratorProps.getNoDataProps
  getResizerProps?: ComponentDecoratorProps.getResizerProps
}

export const ReactTable: React.FC<ReactTableProps>;
