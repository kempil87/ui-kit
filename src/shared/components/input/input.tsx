import { InputHTMLAttributes, ReactNode, useRef } from 'react';
import cn from 'classnames';
import { IconButton } from '../icon-button/icon-button.tsx';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  _prefix?: ReactNode;
  allowClear?: boolean;
  onClear?: () => void;
  label?: string;
}

export const Input = ({
  _prefix,
  value,
  label,
  onClear,
  allowClear = false,
  ...props
}: InputProps) => {
  const prefixRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefixRef.current && inputRef.current) {
      const paddingLeft = `${
        prefixRef.current.getBoundingClientRect().width + 14
      }px`;

      inputRef.current.style.paddingLeft = paddingLeft;

      if (!labelRef.current) return;
      labelRef.current.style.paddingLeft = paddingLeft;
    }
  }, []);

  return (
    <div className='relative group'>
      <div
        ref={prefixRef}
        className={cn('pos-abs-y inline-block left-2.5', {
          invisible: !_prefix,
        })}
      >
        {_prefix}
      </div>

      {label && (
        <label
          ref={labelRef}
          className={cn(
            'pos-abs-y text-sm pointer-events-none pl-3.5 group-focus-within:!top-0 group-focus-within:!pl-2 group-focus-within:text-xs transition-all duration-300 text-placeholder inline-block',
            { '!top-0 !text-xs !pl-2': value }
          )}
        >
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        className={cn(
          'appearance-none h-9 w-full focus:placeholder:opacity-100 transition-all duration-300 border border-border bg-bg caret-placeholder text-sm placeholder:text-placeholder focus:border-accent active:border-accent focus:outline-0 py-1 px-3.5 rounded-md',
          { 'pr-8': allowClear },
          { 'placeholder:opacity-0': label }
        )}
        {...{ ...props, value }}
      />

      {value && allowClear && (
        <IconButton
          title='Clear'
          onClick={onClear}
          className={cn('pos-abs-y right-1 size-6')}
          iconProps={{
            name: 'common/close',
            className: 'size-3.5',
          }}
        />
      )}
    </div>
  );
};
