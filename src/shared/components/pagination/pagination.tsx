import { DOTS, usePagination } from './use-pagination.ts';
import { Icon } from '../icon/icon.tsx';
import cn from 'classnames';

export interface PaginationProps {
  lastPage: number | undefined;
  countRecord?: number;
  dataLength?: number;
  initialValue?: number;
  siblingCount?: number;
  tableName?: string;
  onChange: (page: number) => void;
  currentPage: number;
  wrapClassName?: HTMLDivElement['className'];
}

export const Pagination = (props: PaginationProps) => {
  const {
    goToPage,
    currentPage,
    paginationRange,
    isFirstPage,
    isLastPage,
    onPrev,
    onNext,
  } = usePagination(props);

  if (props.currentPage <= 0) {
    throw new Error('CurrentPage can only be greater than zero');
  }

  if (paginationRange.length < 2) return null;

  return (
    <div className={cn(props.wrapClassName)}>
      <nav className='isolate inline-flex children:border-r children:border-border last-of-type:children:border-r-0 items-center border border-border rounded-md h-8'>
        <button
          className={cn(
            'size-8 flex-center transition-all duration-300 disabled:cursor-not-allowed disabled:text-grey'
          )}
          disabled={isFirstPage}
          onClick={onPrev}
        >
          <Icon className='size-3.5 rotate-90' name='common/arrow' />
        </button>

        {paginationRange.map((i, index) => {
          if (i === DOTS) {
            return (
              <button disabled className='size-8 flex-center' key={index}>
                <span className='block h-full text-center'>{DOTS}</span>
              </button>
            );
          }

          return (
            <button
              className={cn(
                'size-8 text-sm transition-[background] duration-300',
                {
                  'bg-border': currentPage === i,
                }
              )}
              key={index}
              onClick={() => goToPage(i as number)}
            >
              {i}
            </button>
          );
        })}

        <button
          className={cn(
            'size-8 flex-center transition-all duration-300 disabled:cursor-not-allowed disabled:text-grey'
          )}
          disabled={isLastPage}
          onClick={onNext}
        >
          <Icon className='size-3.5 -rotate-90' name='common/arrow' />
        </button>
      </nav>
    </div>
  );
};
