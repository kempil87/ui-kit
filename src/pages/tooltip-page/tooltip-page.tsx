import { Button } from '../../shared/components/button/button.tsx';
import { Card } from '../../shared/components/card/card.tsx';
import { Tooltip } from '../../shared/components/tooltip/tooltip.tsx';

export const TooltipPage = () => {
  return (
    <Card title='Tooltip'>
      <div className='inline-flex items-center gap-4'>
        <Tooltip arrow={false} content={<span>Delete?</span>}>
          <Button>Delete</Button>
        </Tooltip>

        <Tooltip content={<span>arrow={'{true}'}</span>}>
          <Button>WithArrow</Button>
        </Tooltip>
      </div>
    </Card>
  );
};
