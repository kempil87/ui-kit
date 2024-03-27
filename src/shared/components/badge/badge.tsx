import { HTMLAttributes, PropsWithChildren } from 'react';
import cn from 'classnames';
export interface BadgeProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  accentColor?: string;
  wrapClassName?: HTMLDivElement['className'];
  withRing?: boolean;
}

export const Badge = ({
  children,
  content,
  wrapClassName,
  withRing = true,
  accentColor = '#FF604B',
  ...props
}: BadgeProps) => {
  if (!content) return children;

  return (
    <div className={cn('relative inline-block', wrapClassName)}>
      <div
        {...props}
        style={{ backgroundColor: accentColor, ...props.style }}
        className={cn(
          'absolute transition-all duration-300 whitespace-nowrap text-xs inline-flex justify-center items-center pointer-events-none font-medium h-4 aspect-square right-0 top-0 translate-x-1/2 -translate-y-1/2 rounded-full',
          { 'px-1': content.length > 1 },
          { 'scale-0': !Number(content) },
          { 'ring-1 ring-white': withRing },
          props.className
        )}
      >
        {content}
      </div>
      {children}
    </div>
  );
};
