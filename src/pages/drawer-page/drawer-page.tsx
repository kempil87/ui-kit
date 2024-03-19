import { Button } from '../../shared/components/button/button.tsx';
import { useState } from 'react';
import { Card } from '../../shared/components/card/card.tsx';
import { Drawer } from '../../shared/components/drawer/drawer.tsx';

export const DrawerPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleCustom, setIsVisibleCustom] = useState(false);

  return (
    <Card title='Drawer'>
      <div className='flex gap-5 flex-wrap'>
        <Button onClick={() => setIsVisible(true)}>Open Drawer</Button>
        <Button onClick={() => setIsVisibleCustom(true)}>
          Open Custom Header Drawer
        </Button>
      </div>

      <Drawer
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        title='Preview Drawer'
      >
        <span>Drawer Content</span>
      </Drawer>

      <Drawer
        position='left'
        visible={isVisibleCustom}
        onClose={() => setIsVisibleCustom(false)}
        title='Preview Custom Header Drawer'
        header={
          <div>
            <Button>Custom</Button>
          </div>
        }
      >
        <span>Custom Header Drawer</span>
      </Drawer>
    </Card>
  );
};
