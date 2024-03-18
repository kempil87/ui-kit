import { Card } from '../../shared/components/card/card.tsx';
import { IconButton } from '../../shared/components/icon-button/icon-button.tsx';
import { FloatButton } from '../../shared/components/float-button/float-button.tsx';
import { Tooltip } from '../../shared/components/tooltip/tooltip.tsx';

export const FloatButtonPage = () => {
  return (
    <Card title='Float Button'>
      <Tooltip content='Check right bottom corner'>
        <div className='flex items-center gap-x-5'>
          <IconButton
            iconProps={{ name: 'common/long_arrow', className: 'rotate-90' }}
          />

          <IconButton iconProps={{ name: 'common/user' }} />
        </div>
      </Tooltip>

      <FloatButton>
        <FloatButton.Item
          iconProps={{ name: 'common/long_arrow', className: 'rotate-90' }}
        />
        <FloatButton.Item iconProps={{ name: 'common/user' }} />
      </FloatButton>
    </Card>
  );
};
