import { Button } from '../../shared/components/button/button.tsx';
import { Card } from '../../shared/components/card/card.tsx';
import { toast } from '../../shared/components/toast/toast.tsx';

export const ToastPage = () => {
  const onShowSuccess = () => toast.show({ message: 'success' });
  const onShowError = () => toast.show({ message: 'error', type: 'error' });
  const onShowInfo = () => toast.show({ message: 'error', type: 'info' });
  const onShowWarning = () => toast.show({ message: 'error', type: 'warning' });

  return (
    <Card title='Toast'>
      <div className='gap-5 flex-wrap flex items-center'>
        <Button onClick={onShowSuccess}>Show Success Toast</Button>

        <Button onClick={onShowError}>Show Error Toast</Button>

        <Button onClick={onShowInfo}>Show Info Toast</Button>

        <Button onClick={onShowWarning}>Show Warning Toast</Button>
      </div>
    </Card>
  );
};
