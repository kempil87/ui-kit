import { IconProps } from '../icon/icon.tsx';
import { Button, ButtonProps } from '../button/button.tsx';
import { IconButton } from '../icon-button/icon-button.tsx';
import cn from 'classnames';

export interface FloatButtonProps extends ButtonProps {
  iconProps?: IconProps;
}

export const FloatButton = ({ children }: FloatButtonProps) => {
  return (
    <div className={cn('fixed bottom-16 right-10 flex flex-col gap-5')}>
      {children}
    </div>
  );
};

FloatButton.Item = ({ children, iconProps, ...props }: FloatButtonProps) => {
  if (iconProps) {
    return (
      <IconButton
        iconProps={{
          ...iconProps,
          className: cn('size-4', iconProps.className),
        }}
      />
    );
  }
  return <Button {...props}>{children}</Button>;
};
