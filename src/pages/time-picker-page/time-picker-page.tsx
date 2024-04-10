import { FormProvider, useForm } from 'react-hook-form';
import { Card } from '../../shared/components/card/card';
import {
  TimePicker,
  TimePickerFormats,
} from '../../shared/components/time-picker/time-picker.tsx';

export const TimePickerPage = () => {
  const form = useForm();
  console.log(form.watch());

  return (
    <FormProvider {...form}>
      <Card title='TimePicker'>
        <div className='space-y-5'>
          <TimePicker
            inputProps={{
              label: 'Picker Hour',
              placeholder: 'Select values',
            }}
            format={TimePickerFormats.hours}
            name='hours'
          />
          <TimePicker
            inputProps={{
              label: 'Picker Minutes',
              placeholder: 'Select values',
            }}
            name='mins'
          />
          <TimePicker
            inputProps={{
              label: 'Picker Seconds',
              placeholder: 'Select values',
            }}
            format={TimePickerFormats.secs}
            name='seconds'
          />
        </div>
      </Card>
    </FormProvider>
  );
};
