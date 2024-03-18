import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';
import { Icon } from '../icon/icon.tsx';

export interface DrawerProps extends PropsWithChildren {
  header?: ReactNode;
  title?: ReactNode;
  visible?: boolean;
  closeIcon?: boolean;
  maskClosable?: boolean;
  withBlurMask?: boolean;
  onClose: () => void;
  position?: 'right' | 'left';
}

export const Drawer = ({
  header,
  title,
  closeIcon = true,
  visible = false,
  maskClosable = true,
  withBlurMask = true,
  position = 'right',
  onClose,
  children,
}: DrawerProps) => {
  const drawerContentRef = useRef<HTMLDivElement>(null);

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

  useOnClickOutside(drawerContentRef, outsideHandler);

  return (
    <div
      className={cn('drawer-mask', { visible }, { 'blur-mask': withBlurMask })}
    >
      <div
        ref={drawerContentRef}
        className={cn('drawer-content', position, {
          visible,
        })}
      >
        {header || (
          <div className='relative h-8'>
            <span>{title}</span>

            {closeIcon && (
              <button
                onClick={close}
                className='size-8 flex-center bg-accent border-border border rounded-md hover:bg-bg transition-all duration-300 absolute top-0 right-0'
              >
                <Icon className='fill-white size-3.5' name='common/close' />
              </button>
            )}
          </div>
        )}

        <div className='pt-4'>{children}</div>
      </div>
    </div>
  );
};
