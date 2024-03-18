import {
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';
import cn from 'classnames';

export interface CardProps
  extends PropsWithChildren,
    Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  extra?: ReactNode;
  title?: ReactNode;
  headerStyles?: CSSProperties;
  headerClassName?: HTMLDivElement['className'];
  contentStyles?: CSSProperties;
  contentClassName?: HTMLDivElement['className'];
}

export const Card = ({
  children,
  title,
  headerStyles,
  headerClassName,
  contentClassName,
  contentStyles,
  extra,
  ...props
}: CardProps) => {
  return (
    <div
      {...props}
      className={cn('bg-bg border-border border rounded-md', props.className)}
    >
      <div
        style={headerStyles}
        className={cn(
          'flex-between border-b border-border p-4',
          headerClassName
        )}
      >
        <div>{title}</div>
        <div>{extra}</div>
      </div>

      <div
        className={cn('p-4 bg-black rounded-b-md', contentClassName)}
        style={contentStyles}
      >
        {children}
      </div>
    </div>
  );
};
