import { Button } from '../../shared/components/button/button.tsx';
import { Card } from '../../shared/components/card/card.tsx';
import { Icon } from '../../shared/components/icon/icon.tsx';

export const ButtonPage = () => {
  return (
    <Card title='Button'>
      <div className='flex flex-wrap items-center gap-5'>
        <Button
          onClick={() => console.log('onClick btn')}
          className='test-classname'
        >
          With Props
        </Button>

        <Button href='/' variant='light'>
          <Icon name='common/user' className='size-4 mr-2' />
          Link
        </Button>

        <Button variant='danger'>Danger</Button>
      </div>
    </Card>
  );
};
