import { Card } from '../../shared/components/card/card.tsx';
import { Input, InputMethods } from '../../shared/components/input/input.tsx';
import { Icon } from '../../shared/components/icon/icon.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../shared/components/button/button.tsx';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { Mask } from '../../shared/utils/mask.ts';

interface FormProps {
  email: string;
  pass: string;
  clear: string;
  mask: string;
}

const schema = z.object({
  email: z
    .string({ required_error: 'Field is required' })
    .email('Invalid Email field'),
  pass: z.string({ required_error: 'Field is required' }).min(6),
});

export const InputPage = () => {
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
  });

  const someInputRef = useRef<InputMethods>(null);

  const onClear = () => alert('Field "Clearable Input" as clear');

  const submitForm = (fields: FormProps) => {
    console.log(
      Mask.parse({ text: fields.mask, pattern: Mask.patterns.phone })
    );
  };

  const onFocusSecondInput = () => {
    if (!someInputRef.current) return;

    someInputRef.current.focus();
  };

  const onBlurSecondInput = () => {
    if (!someInputRef.current) return;

    someInputRef.current.blur();
  };

  return (
    <FormProvider {...form}>
      <Card
        title='TimePicker'
        extra={
          <div className='inline-flex items-center gap-4'>
            <Button variant='light' onClick={onFocusSecondInput}>
              Focus for second Input
            </Button>

            <Button variant='light' onClick={onBlurSecondInput}>
              Blur for second Input
            </Button>
          </div>
        }
      >
        <div className='grid gap-5 grid-cols-1 lg:grid-cols-3'>
          <Input name='basic' placeholder='Basic usage' label='Basic label' />
          <Input
            ref={someInputRef}
            name='number'
            placeholder='Number usage'
            label='Number label'
            type='number'
          />

          <Input
            name='clear'
            placeholder='Clear usage'
            label='Clear label'
            allowClear
            onClear={onClear}
          />

          <Input
            name='prefix'
            _prefix={<Icon className='size-4' name='common/user' />}
            placeholder='Preffix usage'
          />

          <Input
            name='mask'
            _prefix={<Icon className='size-4' name='common/phone' />}
            placeholder='Mask usage'
            label='Mask'
            mask={Mask.masks.phone}
            textChange={(value, unmasked) => console.log(value, unmasked)}
          />

          <Input
            name='maxLength'
            maxLength={4}
            placeholder='MaxLength usage'
            label='MaxLength'
          />
        </div>
      </Card>

      <Card className='mt-4' title='Form'>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 mb-4'>
            <Input name='email' placeholder='Email enter' label='Email' />

            <Input name='pass' placeholder='Password enter' label='Password' />
          </div>

          <Button onClick={form.handleSubmit(submitForm)}>Submit</Button>
        </form>
      </Card>
    </FormProvider>
  );
};
