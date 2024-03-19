import { HTMLAttributes } from 'react';

import cn from 'classnames';
import { Icon } from '../icon/icon.tsx';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {}

export const Spinner = ({ className }: SpinnerProps) => (
  <div className={cn(className)}>
    <Icon className='size-6 animate-spin' name='common/spin' />
  </div>
);
