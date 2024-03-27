import { useState } from 'react';
import { Card } from '../../shared/components/card/card.tsx';
import { Switch } from '../../shared/components/switch/switch.tsx';

export const SwitchPage = () => {
  const [isActiveLabel, setIsActiveLabel] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <Card title='Checkbox'>
      <div className='flex gap-5 flex-col'>
        <Switch value={isActive} onChange={setIsActive} />

        <Switch
          label='Basic Label'
          value={isActiveLabel}
          onChange={setIsActiveLabel}
        />

        <Switch
          value={false}
          onChange={(s) => console.log(s)}
          disabled
          label='Disabled'
        />
      </div>
    </Card>
  );
};
