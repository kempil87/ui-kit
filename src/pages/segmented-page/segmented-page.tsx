import { Card } from '../../shared/components/card/card.tsx';
import { Segmented } from '../../shared/components/segmented/segmented.tsx';

export const SegmentedPage = () => {
  return (
    <Card title='Segmented'>
      <div className='space-y-4'>
        <Segmented
          options={[
            'March',
            { label: 'April', value: 2 },
            { disabled: true, label: 'May', value: 3 },
            { label: 'June', value: 4 },
            { label: 'July', value: 5 },
            { label: 'August', value: 6 },
            'September',
          ]}
        />

        <Segmented
          defaultIndex={1}
          options={[
            'March',
            { label: 'April', value: 2 },
            { disabled: true, label: 'May', value: 3 },
            { label: 'June', value: 4 },
            { label: 'July', value: 5 },
            { label: 'August', value: 6 },
            'September',
          ]}
        />
      </div>
    </Card>
  );
};
