import { Card } from '../../shared/components/card/card.tsx';
import { Chip } from '../../shared/components/chip/chip.tsx';

export const ChipPage = () => {
  return (
    <Card title='Chip'>
      <div className='flex gap-5 flex-wrap items-center'>
        <Chip>Chip1</Chip>
        <Chip withIcon={false}>Chip2</Chip>
        <Chip disabled>Disabled</Chip>
      </div>
    </Card>
  );
};
