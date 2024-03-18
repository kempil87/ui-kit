import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type ButtonVariants = 'outline' | 'light' | 'danger' | 'primary';

export interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
  href?: string;
  disabled?: boolean;
  variant?: ButtonVariants;
}

type RootProps = Omit<ButtonProps, 'variant'>;
/**
 * Заменить Компонент Ссылки для React из react-router-dom для Next из next/navigation
 * **/

const BUTTONS_VARIANTS: Record<ButtonVariants, string> = {
  outline: 'border-border bg-accent hover:bg-bg/30',
  danger: 'border-red bg-bg hover:bg-bg/30',
  light: 'border-white text-black bg-white hover:bg-light_grey',
  primary: 'hover:bg-accent border-0',
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ href, variant = 'outline', disabled, ...props }, ref) => {
  const { children, ...rootProps } = props;

  const Root = ({ children, ...properties }: RootProps) =>
    href ? (
      <Link
        ref={ref as ForwardedRef<HTMLAnchorElement>}
        role='button'
        {...properties}
        to={href}
      >
        {children}
      </Link>
    ) : (
      <button
        ref={ref as ForwardedRef<HTMLButtonElement>}
        {...{ ...properties, disabled }}
      >
        {children}
      </button>
    );

  return (
    <Root
      {...rootProps}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 border shadow-sm h-9 px-4 py-2',
        { 'pointer-events-none opacity-50': disabled },
        BUTTONS_VARIANTS[variant],
        rootProps.className
      )}
      title={
        rootProps.title ?? (typeof children === 'string' ? children : undefined)
      }
    >
      {children}
    </Root>
  );
});

Button.displayName = 'Button';
