import { Card } from '../../shared/components/card/card.tsx';
import { IconButton } from '../../shared/components/icon-button/icon-button.tsx';

export const IconButtonPage = () => {
  return (
    <Card title='Icon Button'>
      <div className='flex items-center gap-x-5'>
        <IconButton iconProps={{ name: 'common/user' }} />

        <IconButton
          variant='light'
          iconProps={{ name: 'common/done', className: 'min-size-3.5' }}
        />

        <IconButton iconProps={{ name: 'common/collapse' }} variant='danger' />
      </div>
    </Card>
  );
};
