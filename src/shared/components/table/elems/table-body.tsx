import { TableProps } from '../table.tsx';
import cn from 'classnames';
import { Spinner } from '../../spinner/spinner.tsx';

export interface TableBodyProps
  extends Pick<
    TableProps,
    'columns' | 'isLoading' | 'data' | 'notFoundText' | 'name' | 'onRowClick'
  > {}

export const TableBody = ({
  columns,
  isLoading,
  data,
  onRowClick,
  notFoundText,
}: TableBodyProps) => {
  return (
    <tbody>
      {/*{!!columns.filter((c) => c.filter).length && (*/}
      {/*  <tr*/}
      {/*    className={cn('group !bg-white', {*/}
      {/*      'pointer-events-none select-none': isLoading,*/}
      {/*    })}*/}
      {/*  >*/}
      {/*    {columns.map(({ filter, title, dataKey, tdProps }, index) => (*/}
      {/*      <td*/}
      {/*        key={index}*/}
      {/*        {...tdProps}*/}
      {/*        className='font-normal group-hover:!bg-white'*/}
      {/*      >*/}
      {/*        {title}*/}
      {/*        /!*{renderFilter(*!/*/}
      {/*        /!*  filter as TableColumnFilter<string>,*!/*/}
      {/*        /!*  dataKey as string*!/*/}
      {/*        /!*)}*!/*/}
      {/*      </td>*/}
      {/*    ))}*/}
      {/*  </tr>*/}
      {/*)}*/}

      {isLoading ? (
        <tr>
          <td colSpan={columns.length}>
            <div className='my-6 flex justify-center'>
              <Spinner />
            </div>
          </td>
        </tr>
      ) : !isLoading && !data?.length ? (
        <tr>
          <td className='text-center font-medium' colSpan={columns.length}>
            {notFoundText}
          </td>
        </tr>
      ) : (
        data?.map((row, index) => (
          <tr
            {...(onRowClick && { onClick: () => onRowClick(row, index) })}
            key={index}
            className='group align-top'
          >
            {columns?.map(({ dataKey, render, tdProps }, cIndex) => {
              const data = String(dataKey).length ? row[dataKey as string] : '';

              return (
                <td
                  key={cIndex}
                  align={data ? 'left' : 'center'}
                  {...tdProps}
                  className={cn('', tdProps?.className)}
                >
                  {render?.(data, row, index) || (data as string)}
                </td>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  );
};
