import { Button } from '../../shared/components/button/button.tsx';
import { Badge } from '../../shared/components/badge/badge.tsx';
import { useState } from 'react';
import { Card } from '../../shared/components/card/card.tsx';

export const BadgePage = () => {
  const [count, setCount] = useState(1);

  return (
    <Card title='Badge'>
      <div className='space-x-5'>
        <Badge content={String(count)}>
          <Button>Badge {count}</Button>
        </Badge>

        <Badge content='12'>
          <Button>Badge 12</Button>
        </Badge>

        <Badge content='123'>
          <Button>Badge 123</Button>
        </Badge>
      </div>

      <Button onClick={() => setCount((p) => p + 1)} className='mt-5'>
        Change Count
      </Button>
    </Card>
  );
};
