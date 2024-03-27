/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableHead } from './elems/table-head.tsx';
import { TableBody } from './elems/table-body.tsx';
import { Pagination, PaginationProps } from '../pagination/pagination.tsx';
import {
  PropsWithChildren,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { Card, CardProps } from '../card/card.tsx';
import cn from 'classnames';

export type ValueOfType<T> = T[keyof T];

export type AnyObjectType = Record<string, unknown>;

export interface TableColumnFilter<Name> {
  type:
    | 'input'
    | 'select'
    | 'datepicker'
    | 'datepicker-range'
    | 'select-search';
  name?: Name | Name[];
  props?: AnyObjectType;
}

export interface TableColumn<
  DataKey = any,
  FilterName = any,
  SortKey = string
> {
  dataKey: keyof DataKey | string;
  filter?: TableColumnFilter<keyof FilterName>;
  render?: (v: ValueOfType<DataKey>, item: DataKey, index: number) => ReactNode;
  sortKey?: SortKey;
  tdProps?: TdHTMLAttributes<HTMLTableCellElement>;
  thProps?: ThHTMLAttributes<HTMLTableCellElement>;
  title?: string;
}

export type TableData = AnyObjectType;

export interface TableProps {
  columns: TableColumn[];
  data: TableData[] | undefined;
  name?: string;
  cardProps?: CardProps;
  cardTitle?: ReactNode;
  isLoading?: boolean;
  notFoundText?: string;
  pagination?: PaginationProps;
  summary?: ReactNode;
  onRowClick?: (item: TableData, index: number) => void;
}

export const Table = ({
  cardProps,
  columns,
  name,
  data,
  isLoading,
  pagination,
  notFoundText,
  onRowClick,
  summary,
}: TableProps) => {
  const Root = ({ children }: PropsWithChildren) => {
    if (cardProps) {
      return <Card {...cardProps}>{children}</Card>;
    }

    return children;
  };

  return (
    <Root>
      <div className='overflow-x-auto'>
        <table className='table min-w-max'>
          <TableHead {...{ columns, name, isLoading }} />

          <TableBody
            {...{
              columns,
              data,
              isLoading,
              notFoundText,
              summary,
              name,
              onRowClick,
            }}
          />
        </table>
      </div>

      {summary && <div className='mt-4 w-full'>{summary}</div>}

      {pagination && (
        <Pagination
          wrapClassName={cn(
            'flex justify-center lg:justify-end mt-4',
            pagination.wrapClassName
          )}
          {...pagination}
        />
      )}
    </Root>
  );
};
