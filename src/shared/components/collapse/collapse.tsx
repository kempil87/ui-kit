import { PropsWithChildren, ReactNode, useRef } from 'react';
import { Icon } from '../icon/icon.tsx';
import cn from 'classnames';

type CollapseProps = PropsWithChildren;
export interface CollapseItemProps extends PropsWithChildren {
  opened?: boolean;
  header: ReactNode;
  onChange?: (opened: boolean) => void;
  icon?: ReactNode;
  extra?: ReactNode;
  contentClassName?: HTMLDivElement['className'];
}

export const Collapse = ({ children }: CollapseProps) => {
  if (!children) {
    throw new Error('Collapse must be with children');
  }

  return (
    <div className='overflow-hidden rounded-md border border-border'>
      {children}
    </div>
  );
};

Collapse.Item = ({
  opened = false,
  children,
  header,
  onChange,
  icon,
  contentClassName,
  extra,
}: CollapseItemProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const headerRef = useRef<HTMLButtonElement>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!contentRef.current || !headerRef.current) return;

    const updatedOpened = JSON.stringify(
      !JSON.parse(contentRef.current.dataset.open ?? JSON.stringify(opened))
    );

    if (JSON.parse(contentRef.current.dataset.open ?? JSON.stringify(opened))) {
      contentRef.current.classList.remove('fade-1');
    } else {
      contentRef.current.classList.add('fade-1');
    }
    contentRef.current.dataset.open = updatedOpened;
    headerRef.current.dataset.open = updatedOpened;

    onChange?.(JSON.parse(updatedOpened));
  };

  return (
    <section className='last-of-type:border-b-0 border-b border-border'>
      <button
        data-open={JSON.stringify(opened)}
        onClick={toggle}
        className='w-full group bg-bg'
        ref={headerRef}
      >
        <div className='flex-between px-4 py-3'>
          <div className='inline-flex gap-x-4 items-center justify-start w-full'>
            <div className='group-data-[open=true]:rotate-0 -rotate-90 transition-transform duration-300 ease-linear'>
              {icon || (
                <Icon className='stroke-white size-4' name='common/arrow' />
              )}
            </div>

            {header}
          </div>

          <div className='cursor-default' onClick={(e) => e.stopPropagation()}>
            {extra}
          </div>
        </div>
      </button>

      <div
        className={cn(
          'data-[open=true]:border-t fade-1 bg-black pointer-events-none group data-[open=true]:pointer-events-auto group data-[open=true]:py-3 data-[open=true]:h-fit h-0 transition-all duration-[400] ease-linear border-border px-4',
          contentClassName
        )}
        data-open={JSON.stringify(opened)}
        ref={contentRef}
      >
        <div className='group-data-[open=true]:opacity-100 opacity-0'>
          {children}
        </div>
      </div>
    </section>
  );
};
