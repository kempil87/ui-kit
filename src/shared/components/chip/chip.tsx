import { ButtonHTMLAttributes } from 'react';
import { IconButton } from '../icon-button/icon-button.tsx';
import cn from 'classnames';
import { IconProps } from '../icon/icon.tsx';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onRemove?: () => void;
  withIcon?: boolean;
  customIcon?: IconProps;
}

export const Chip = ({
  children,
  onRemove,
  withIcon = true,
  customIcon,
  ...props
}: ChipProps) => {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex disabled:border-placeholder disabled:bg-placeholder disabled:cursor-not-allowed text-sm h-6 font-light items-center gap-1.5 bg-bg border-border border rounded-full pl-1 pr-0.5',
        props.className
      )}
    >
      <span>{children}</span>

      {withIcon && (
        <IconButton
          disabled={props.disabled}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className='!size-5 !rounded-full'
          variant='outline'
          iconProps={
            customIcon || { name: 'common/close', className: '!size-2.5' }
          }
        />
      )}
    </button>
  );
};
