import {
  Children,
  cloneElement,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useRef,
} from 'react';
import cn from 'classnames';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

export interface PopoverProps
  extends PropsWithChildren,
    Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content?: ReactNode;
  trigger?: 'click' | 'hover' | 'all';
  opened?: boolean;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Popover = ({
  children,
  content,
  opened = false,
  disabled = false,
  onOpen,
  onClose,
  trigger = 'hover',
  className,
}: PopoverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onShow = () => {
    if (trigger === 'hover' || !ref.current || disabled) return;

    ref.current.dataset.visible = JSON.stringify(
      !JSON.parse(ref.current.dataset.visible ?? JSON.stringify(opened))
    );

    onOpen?.();
  };

  const onHide = () => {
    if (!ref.current) return;

    ref.current.dataset.visible = 'false';
    onClose?.();
  };

  useOnClickOutside(ref, onHide);

  useEventListener('scroll', onHide);

  return (
    <div className='relative inline-block'>
      {Children.map(children as ReactElement, (child: ReactElement) => {
        return cloneElement(child as ReactElement, {
          onClick: onShow,
          className: cn(child.props?.className, {
            peer: !disabled && ['all', 'hover'].includes(trigger),
          }),
          role: 'button',
        });
      })}

      <div
        data-visible={JSON.stringify(opened)}
        ref={ref}
        className={cn(
          '-top-2 data-[visible=true]:scale-100 data-[visible=true]:opacity-100 scale-0 delay-300 peer-hover:scale-100 min-w-full origin-bottom-right opacity-0  peer-hover:opacity-100 hover:opacity-100 hover:scale-100 transition-all duration-300 ease-in rounded-md backdrop-blur bg-opacity-50 bg-bg border-border border py-3 px-5 z-full -translate-y-full right-0 absolute',
          className
        )}
      >
        {content}
      </div>
    </div>
  );
};
