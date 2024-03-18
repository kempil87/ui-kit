import { Card } from '../../shared/components/card/card.tsx';
import { Segmented } from '../../shared/components/segmented/segmented.tsx';

export const SegmentedPage = () => {
  return (
    <Card title='Segmented'>
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
    </Card>
  );
};
