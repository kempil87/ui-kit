import { Button } from '../../shared/components/button/button.tsx';
import { Card } from '../../shared/components/card/card.tsx';
import { Icon } from '../../shared/components/icon/icon.tsx';

export const ButtonPage = () => {
  return (
    <Card title='Button'>
      <div className='flex items-center gap-x-5'>
        <Button
          onClick={() => console.log('onClick btn')}
          className='test-classname'
        >
          Контент
        </Button>

        <Button href='/profile' variant='light'>
          <Icon name='common/user' className='size-4 mr-2' />
          Контент
        </Button>

        <Button variant='danger'>Контент</Button>
      </div>
    </Card>
  );
};
