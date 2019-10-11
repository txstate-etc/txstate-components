import * as React from 'react';

export interface TableColumns {
  name?: string;
  selector?: string;
  sortable?: boolean;
  format?: (...args: any[]) => any;
  cell?: any;
  right?: boolean;
  center?: boolean;
  grow?: number;
  ignoreRowClick?: boolean;
  button?: boolean;
  allowOverflow?: boolean;
  hide?: number | "sm" | "md" | "lg";
}

export interface TableProps {
  columns?: TableColumns[];
  selectableRows?: boolean;
  dataSource?: () => Promise<any> | any;
  onRowSelected?: (...args: any[]) => any | any;
  initialPageSize?: number;
  title?: string;
  keyField?: string;
}

export const Table: React.FC<TableProps>;

