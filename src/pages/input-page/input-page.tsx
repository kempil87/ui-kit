import { Card } from '../../shared/components/card/card.tsx';
import { Input } from '../../shared/components/input/input.tsx';
import { useState } from 'react';
import { Icon } from '../../shared/components/icon/icon.tsx';

export const InputPage = () => {
  const [values, setValues] = useState<
    Partial<Record<'basic' | 'clear' | 'prefix', string>>
  >({});

  const onFormChange = (name: string, value: string) => {
    setValues((p) => ({ ...p, [name]: value }));
  };

  const onClear = () => {
    setValues((p) => ({ ...p, clear: '' }));
  };

  return (
    <Card title='Input'>
      <div className='grid gap-5 grid-cols-3'>
        <Input
          value={values.basic}
          onChange={(e) => onFormChange('basic', e.target.value)}
          placeholder='Basic usage'
          label='Basic label'
        />
        <Input
          onChange={(e) => onFormChange('clear', e.target.value)}
          placeholder='Clear usage'
          allowClear
          onClear={onClear}
          value={values.clear}
        />
        <Input
          _prefix={<Icon className='size-4' name='common/user' />}
          onChange={(e) => onFormChange('prefix', e.target.value)}
          placeholder='Preffix usage'
          value={values.prefix}
        />
      </div>
    </Card>
  );
};
