import {
  Children,
  cloneElement,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import cn from '../../utils/cn.ts';

export interface TooltipProps
  extends PropsWithChildren,
    Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content?: ReactNode;
  opened?: boolean;
  arrow?: boolean;
}

export const Tooltip = ({
  children,
  arrow = true,
  opened,
  content,
  className,
  ...props
}: TooltipProps) => {
  return (
    <div className='relative inline-block'>
      {Children.map(children as ReactElement, (child: ReactElement) => {
        return cloneElement(child as ReactElement, {
          className: `${child.props.className} peer`,
        });
      })}

      <div
        {...props}
        data-visible={JSON.stringify(opened)}
        className={cn(
          '-top-2.5 left-1/2 -translate-x-1/2 text-xs min-w-fit data-[visible=true]:scale-100 data-[visible=true]:opacity-100 scale-0 peer-hover:scale-100 origin-bottom opacity-0 peer-hover:opacity-100 pointer-events-none transition-all duration-300 ease-in rounded-md backdrop-blur bg-opacity-50 bg-bg border-border border py-1 px-5 z-50 -translate-y-full  absolute',
          className
        )}
      >
        {arrow && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='10'
            height='10'
            className='tooltip-content-chevron absolute mx-auto inset-x-0 bottom-0.5 fill-border'
          >
            <path d='M19.749,9.464,5,.048V23.989L19.743,14.54a3,3,0,0,0,.006-5.076Z' />
          </svg>
        )}

        {content}
      </div>
    </div>
  );
};
