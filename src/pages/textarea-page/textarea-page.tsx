import { Card } from '../../shared/components/card/card.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../shared/components/button/button.tsx';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '../../shared/components/textarea/textarea.tsx';
import { Icon } from '../../shared/components/icon/icon.tsx';

interface FormProps {
  desc: string;
  desc2: string;
  desc3: string;
}

const schema = z.object({
  desc: z.string({ required_error: 'Field is required' }),
  desc2: z.string({ required_error: 'Field is required' }),
  desc3: z.string({ required_error: 'Field is required' }),
});

export const TextareaPage = () => {
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
  });

  const submitForm = (fields: FormProps) => {
    console.log(fields);
  };

  return (
    <FormProvider {...form}>
      <Card className='mt-4' title='Form'>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className='grid gap-5 grid-cols-1 lg:grid-cols-2 mb-4'>
            <Textarea
              defaultHeight={40}
              name='desc'
              placeholder='Desc enter'
              label='Basic Textarea'
            />

            <Textarea
              defaultHeight={40}
              _prefix={<Icon className='size-4' name='common/user' />}
              name='desc2'
              placeholder='Desc enter'
              label='Textarea with Prefix'
            />

            <Textarea
              defaultHeight={70}
              maxHeight={120}
              allowClear
              name='desc3'
              placeholder='Desc enter'
              label='Textarea with default Height'
            />
          </div>

          <Button onClick={form.handleSubmit(submitForm)}>Submit</Button>
        </form>
      </Card>
    </FormProvider>
  );
};
