import { useState } from 'react';
import { Card } from '../../shared/components/card/card.tsx';
import { Checkbox } from '../../shared/components/checkbox/checkbox.tsx';

export const CheckboxPage = () => {
  const [isActiveLabel, setIsActiveLabel] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const indeterminateActive = [isActive, isActiveLabel].some(Boolean);
  const allChecked = ![isActive, isActiveLabel].every(Boolean);

  const changeIndeterminate = () => {
    setIsActiveLabel(allChecked);
    setIsActive(allChecked);
  };

  return (
    <Card title='Checkbox'>
      <div className='flex gap-5 flex-col'>
        <Checkbox value={isActive} onChange={setIsActive} />

        <Checkbox
          label='Basic Label'
          value={isActiveLabel}
          onChange={setIsActiveLabel}
        />

        <Checkbox
          value={false}
          onChange={(s) => console.log(s)}
          disabled
          label='Disabled'
        />

        <Checkbox
          indeterminate={allChecked}
          value={indeterminateActive}
          onChange={changeIndeterminate}
          label='Indeterminate CheckAll'
        />
      </div>
    </Card>
  );
};
