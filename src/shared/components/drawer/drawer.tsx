import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import cn from '../../utils/cn.ts';
import { Portal } from '../portal/portal.tsx';
import { useOnClickOutside } from 'usehooks-ts';

export interface DrawerProps extends PropsWithChildren {
  header?: ReactNode;
  title?: ReactNode;
  visible?: boolean;
  withPortal?: boolean;
  closeIcon?: boolean;
  maskClosable?: boolean;
  onClose: () => void;
  position?: 'right' | 'left';
}

export const Drawer = ({
  header,
  title,
  closeIcon = true,
  visible = false,
  withPortal = true,
  maskClosable = true,
  position = 'right',
  onClose,
  children,
}: DrawerProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const Root = ({ children }: PropsWithChildren) => {
    if (withPortal) {
      return <Portal>{children}</Portal>;
    }

    return children;
  };

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
    <Root>
      <div className={cn('drawer-mask', { visible })}>
        <div
          ref={contentRef}
          className={cn('drawer-content', `drawer-content-${position}`, {
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
                  <svg className='fill-white size-3.5' viewBox='0 0 10 10'>
                    <path d='M0.133854 0.780157C-0.0446179 0.601685 -0.0446179 0.312325 0.133854 0.133854C0.312325 -0.0446179 0.601684 -0.0446179 0.780156 0.133854L5 4.3537L9.21984 0.133854C9.39832 -0.0446179 9.68767 -0.0446179 9.86615 0.133854C10.0446 0.312325 10.0446 0.601685 9.86615 0.780157L5.64631 5L9.86615 9.21984C10.0446 9.39832 10.0446 9.68767 9.86615 9.86615C9.68767 10.0446 9.39832 10.0446 9.21984 9.86615L5 5.6463L0.780156 9.86615C0.601684 10.0446 0.312325 10.0446 0.133854 9.86615C-0.0446179 9.68767 -0.0446179 9.39832 0.133854 9.21984L4.35369 5L0.133854 0.780157Z' />
                  </svg>
                </button>
              )}
            </div>
          )}

          <div className='pt-4'>{children}</div>
        </div>
      </div>
    </Root>
  );
};
