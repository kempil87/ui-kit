import {
  Children,
  cloneElement,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useRef,
} from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import cn from 'classnames';

export interface Dropdown
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  disabled?: boolean;
  opened?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  content: ReactNode;
}

export const Dropdown = ({
  children,
  disabled = false,
  opened = false,
  onClose,
  className,
  content,
}: Dropdown) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const onShow = () => {
    if (disabled || !ref.current) return;

    ref.current.dataset.open = JSON.stringify(
      !JSON.parse(ref.current.dataset.open!)
    );
  };

  const onHide = () => {
    if (!ref.current) return;

    ref.current.dataset.open = 'false';
    onClose?.();
  };

  useOnClickOutside(wrapRef, onHide);

  useEventListener('scroll', onHide);

  return (
    <div ref={wrapRef} className='relative'>
      {Children.map(children as ReactElement, (child) =>
        cloneElement(child, {
          onClick: onShow,
        })
      )}

      <div
        ref={ref}
        data-open={JSON.stringify(opened)}
        className={cn(
          'absolute z-full transition-all duration-300 data-[open=true]:scale-100 invisible data-[open=true]:visible scale-75 origin-top-right data-[open=true]:opacity-100 opacity-0 border top-[110%] border-border bg-black rounded-md p-3 right-0',
          className
        )}
      >
        {content}
      </div>
    </div>
  );
};
