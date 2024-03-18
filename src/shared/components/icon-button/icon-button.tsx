import { Icon, IconProps } from '../icon/icon.tsx';
import { Button, ButtonProps } from '../button/button.tsx';
import cn from 'classnames';

export interface IconButtonProps extends ButtonProps {
  iconProps: IconProps;
}

export const IconButton = ({ iconProps, ...props }: IconButtonProps) => {
  return (
    <Button
      {...{ ...props, variant: props.variant || 'primary' }}
      className={cn('aspect-square', props.className)}
      title={props.title ?? `${iconProps.name.replace('/', '')} icon`}
    >
      <Icon {...iconProps} className={cn('min-size-5', iconProps.className)} />
    </Button>
  );
};
