import { TableProps } from '../table.tsx';
import cn from 'classnames';

export interface TableHeadProps extends Pick<TableProps, 'columns'> {}

export const TableHead = ({ columns }: TableHeadProps) => {
  return (
    <thead>
      <tr>
        {columns.map(({ title, thProps, sortKey }, index) => {
          return (
            <th
              key={index}
              {...thProps}
              // onClick={() => handleSortChange(sortKey, tableName)}
              className={cn(thProps?.className, {
                'cursor-pointer': sortKey,
              })}
            >
              <div className={cn('flex items-center justify-between gap-2')}>
                <span>{title}</span>

                {/*{sortKey && (*/}
                {/*  <CustomIcon*/}
                {/*    name='sr-angle-down'*/}
                {/*    className={cn('h-3 w-3 text-black transition', {*/}
                {/*      hidden: !sort?.match(new RegExp(sortKey as string)),*/}
                {/*      'rotate-180 transition': !sort?.match(/-/),*/}
                {/*    })}*/}
                {/*  />*/}
                {/*)}*/}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
