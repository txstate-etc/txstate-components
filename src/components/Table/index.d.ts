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
  dataSource?: () => Promise<any> | any
  initialPageSize?: number
}

export const Table: React.FC<TableProps>;

