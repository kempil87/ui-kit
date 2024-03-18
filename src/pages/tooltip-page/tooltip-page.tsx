import { Button } from '../../shared/components/button/button.tsx';
import { Card } from '../../shared/components/card/card.tsx';
import { Tooltip } from '../../shared/components/tooltip/tooltip.tsx';

export const TooltipPage = () => {
  return (
    <Card title='Tooltip'>
      <Tooltip content={<span>Delete?</span>}>
        <Button>Delete</Button>
      </Tooltip>
    </Card>
  );
};
