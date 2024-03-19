import { useState } from 'react';
import { Card } from '../../shared/components/card/card.tsx';
import { Switch } from '../../shared/components/switch/switch.tsx';

export const SwitchPage = () => {
  const [isActiveLabel, setIsActiveLabel] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <Card title='Switch'>
      <div className='flex gap-5 flex-col'>
        <Switch value={isActive} onChange={setIsActive} />

        <Switch
          label='Basic'
          value={isActiveLabel}
          onChange={setIsActiveLabel}
        />
      </div>
    </Card>
  );
};
