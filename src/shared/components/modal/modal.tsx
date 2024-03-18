import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';
import { Button } from '../button/button.tsx';
import { Icon } from '../icon/icon.tsx';

export interface ModalProps extends PropsWithChildren {
  header?: ReactNode;
  footer?: ReactNode;
  title?: ReactNode;
  visible?: boolean;
  bodyClassName?: HTMLDivElement['className'];
  closeIcon?: boolean;
  maskClosable?: boolean;
  withBlurMask?: boolean;
  onClose: () => void;
}

export const Modal = ({
  footer,
  header,
  title,
  closeIcon = true,
  visible = false,
  maskClosable = true,
  withBlurMask = true,
  onClose,
  bodyClassName,
  children,
}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const close = () => {
    onClose();
  };

  useEffect(() => {}, []);

  const outsideHandler = () => {
    if (!visible) return;

    if (maskClosable) {
      close();
    }
  };

  useOnClickOutside(contentRef, outsideHandler);

  return (
    <div
      className={cn('modal-mask', { visible }, { 'blur-mask': withBlurMask })}
    >
      <div
        ref={contentRef}
        className={cn('modal-content', bodyClassName, { visible })}
      >
        {header || (
          <div className='relative h-8'>
            <span>{title}</span>

            {closeIcon && (
              <button
                onClick={close}
                className='size-8 flex-center bg-accent border-border border rounded-md hover:bg-bg transition-all duration-300 absolute top-0 right-0'
              >
                <Icon className='size-3.5' name='common/close' />
              </button>
            )}
          </div>
        )}

        <div className='py-4'>{children}</div>

        {footer || (
          <div className='flex space-x-4 justify-end items-center'>
            <Button variant='light'>Ok</Button>
            <Button>Cancel</Button>
          </div>
        )}
      </div>
    </div>
  );
};
