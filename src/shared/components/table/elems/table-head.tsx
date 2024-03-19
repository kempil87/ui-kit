import { TableProps } from '../table.tsx';
import cn from 'classnames';
import { Icon } from '../../icon/icon.tsx';
import { useSearchParams } from 'react-router-dom';

export interface TableHeadProps extends Pick<TableProps, 'columns'> {}

export const TableHead = ({ columns }: TableHeadProps) => {
  const [searchParams, updateSearchParams] = useSearchParams();

  const activeArrow = new RegExp(/-/).test(searchParams.get('sort') ?? '');
  const visibleArrow = !searchParams.has('sort');

  const onSort = (sortKey: string) => {
    if (searchParams.get('sort') === `-${sortKey}`) {
      searchParams.delete('sort');
    } else if (searchParams.has('sort')) {
      searchParams.set('sort', `-${sortKey}`);
    } else {
      searchParams.set('sort', sortKey);
    }

    updateSearchParams(searchParams);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ title, thProps, sortKey }, index) => {
          return (
            <th
              key={index}
              {...thProps}
              {...(sortKey && {
                onClick: () => onSort(sortKey),
              })}
              className={cn(thProps?.className, {
                'cursor-pointer': sortKey,
              })}
            >
              <div className={cn('flex items-center justify-between gap-2')}>
                <span>{title}</span>

                {sortKey && (
                  <Icon
                    name='common/long_arrow'
                    className={cn(
                      'size-4 rotate-90 transition-transform duration-300',
                      {
                        invisible: visibleArrow,
                        '!-rotate-90': activeArrow,
                      }
                    )}
                  />
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
