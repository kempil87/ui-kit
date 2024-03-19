import { useState } from 'react';
import { Card } from '../../shared/components/card/card.tsx';
import { Pagination } from '../../shared/components/pagination/pagination.tsx';

export const PaginationPage = () => {
  const [page, setPage] = useState(1);

  return (
    <Card title='Pagination'>
      <Pagination lastPage={20} onChange={setPage} currentPage={page} />
    </Card>
  );
};
