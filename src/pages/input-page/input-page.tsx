import { Card } from '../../shared/components/card/card.tsx';
import { Input } from '../../shared/components/input/input.tsx';
import { Icon } from '../../shared/components/icon/icon.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../shared/components/button/button.tsx';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseMask } from '../../shared/utils/format-with-mask.ts';
import { ParseMaskPatterns } from '../../shared/constants/parse-mask-patterns.ts';
import { Masks } from '../../shared/constants/masks.ts';

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

  const onClear = () => alert('Field as clear');

  const submitForm = (fields: FormProps) => {
    console.log(
      parseMask({ text: fields.mask, pattern: ParseMaskPatterns.phone })
    );
  };

  return (
    <FormProvider {...form}>
      <Card title='Textarea'>
        <div className='grid gap-5 grid-cols-1 lg:grid-cols-3'>
          <Input name='basic' placeholder='Basic usage' label='Basic label' />
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
            mask={Masks.phone}
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
