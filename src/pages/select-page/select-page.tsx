import { Card } from '../../shared/components/card/card.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Select } from '../../shared/components/select/select.tsx';

const options = [
  { label: 'Option1', value: 1 },
  { label: 'Option2', value: 2 },
  { label: 'Option3', value: 3 },
];

export const SelectPage = () => {
  const formMethods = useForm();
  console.log(formMethods.watch());

  return (
    <Card title='Select'>
      <FormProvider {...formMethods}>
        <div className='gap-5 grid-cols-1 lg:grid-cols-2 grid'>
          <Select
            placeholder='basic select'
            name='select_1'
            options={options}
          />
          <Select
            placeholder='multiple select'
            multiple
            name='seelect_2'
            options={options}
          />
        </div>
      </FormProvider>
    </Card>
  );
};
