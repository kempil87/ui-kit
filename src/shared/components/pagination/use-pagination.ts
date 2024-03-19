import { useMemo } from 'react';
import { PaginationProps } from './pagination.tsx';

export const DOTS = '...';

const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  lastPage = 0,
  siblingCount = 2,
  onChange,
  currentPage,
}: PaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const onPrev = () => goToPage(currentPage - 1);
  const onNext = () => goToPage(currentPage + 1);

  const goToPage = (page: number) => onChange(page);

  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..lastPage]
    */
    if (totalPageNumbers >= lastPage) {
      return range(1, lastPage);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and lastPage
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPage);

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and lastPage. Hence, we are using leftSiblingIndex > 2 and rightSiblingIndex < lastPage - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < lastPage - 2;

    const firstPageIndex = 1;
    const lastPageIndex = lastPage;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, lastPage];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(lastPage - rightItemCount + 1, lastPage);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [currentPage, lastPage, siblingCount]);

  return {
    currentPage,
    goToPage,
    isFirstPage,
    isLastPage,
    onNext,
    onPrev,
    paginationRange,
  };
};
