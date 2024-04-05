import { Card } from '../../shared/components/card/card.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { Uploader } from '../../shared/components/uploader/uploader.tsx';
import { Button } from '../../shared/components/button/button.tsx';

export const UploaderPage = () => {
  const methods = useForm();

  const onError = (files: File[]) =>
    alert(
      'Custom Error by Extension for:' +
        JSON.stringify(files.map((el) => el.name).join(','))
    );

  const onSizeError = (files: File[]) =>
    alert(
      'Custom Error by Size for:' +
        JSON.stringify(files.map((el) => el.name).join(','))
    );

  console.log(methods.watch(), 'files watcher');

  return (
    <FormProvider {...methods}>
      <Card title='Uploader'>
        <div className='space-y-4'>
          <span className='text-placeholder block text-sm font-bold'>
            Basic Uploader with Ext,Size Options
          </span>

          <Uploader
            extensionOptions={{
              list: ['jpg'],
              onError,
            }}
            sizeOptions={{
              value: 52_428_800,
              onError: onSizeError,
            }}
            name='files'
          />

          <span className='text-placeholder block text-sm font-bold'>
            Multiple Uploader
          </span>

          <Uploader multiple name='multi_files' />

          <span className='text-placeholder block text-sm font-bold'>
            Disabled Uploader
          </span>

          <Uploader disabled name='dis_files' />

          <span className='text-placeholder block text-sm font-bold'>
            Custom Render Uploader
          </span>

          <Uploader
            renderUploader={() => <Button>Upload Files</Button>}
            name='custom_files'
          />
        </div>
      </Card>
    </FormProvider>
  );
};
