import { Button } from '../../shared/components/button/button.tsx';
import { useState } from 'react';
import { Card } from '../../shared/components/card/card.tsx';
import { Modal } from '../../shared/components/modal/modal.tsx';

export const ModalPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleCustom, setIsVisibleCustom] = useState(false);

  return (
    <Card title='Modal'>
      <div className='flex gap-5 flex-wrap items-center'>
        <Button onClick={() => setIsVisible(true)}>Open Modal</Button>
        <Button onClick={() => setIsVisibleCustom(true)}>
          Open Custom Footer Modal
        </Button>
      </div>

      <Modal
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        title='Preview Modal'
      >
        <span>Modal Content</span>
      </Modal>

      <Modal
        visible={isVisibleCustom}
        onClose={() => setIsVisibleCustom(false)}
        title='Preview Custom Footer Modal'
        footer={
          <div>
            <Button>Custom</Button>
          </div>
        }
      >
        <span>Custom Footer Modal</span>
      </Modal>
    </Card>
  );
};
