import { Button } from '../../shared/components/button/button.tsx';
import { Badge } from '../../shared/components/badge/badge.tsx';
import { useState } from 'react';
import { Card } from '../../shared/components/card/card.tsx';

export const BadgePage = () => {
  const [count, setCount] = useState(1);

  return (
    <Card title='Badge'>
      <div className='flex flex-wrap gap-5 items-center'>
        <Badge content={String(count)}>
          <Button>Badge {count}</Button>
        </Badge>

        <Badge content='12'>
          <Button>Badge 12</Button>
        </Badge>

        <Badge withRing={false} content='123'>
          <Button>Badge 123</Button>
        </Badge>
      </div>

      <Button onClick={() => setCount((p) => p - 1)} className='mt-5'>
        Dec Count
      </Button>

      <Button onClick={() => setCount((p) => p + 1)} className='ml-3 mt-5'>
        Inc Count
      </Button>
    </Card>
  );
};
