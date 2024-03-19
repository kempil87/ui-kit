import { ChangeEvent, InputHTMLAttributes, ReactNode, useId } from 'react';

import cn from 'classnames';
export interface Switch
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: ReactNode;
  onChange: (value: boolean) => void;
  value: boolean;
  wrapClassName?: HTMLDivElement['className'];
}

export const Switch = ({ onChange, wrapClassName, value, label }: Switch) => {
  const id = useId();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(!JSON.parse(e.target.value));
  };

  return (
    <div className={cn('inline-flex items-center gap-1.5', wrapClassName)}>
      <label
        className={cn(
          'h-[17px] transition-all duration-300 cursor-pointer select-none w-8 relative rounded-full p-px bg-bg border-border border active:outline-none',
          { 'bg-placeholder': value }
        )}
        htmlFor={id}
      >
        <input
          hidden
          id={id}
          value={JSON.stringify(value)}
          onChange={change}
          type='checkbox'
        />
        <div
          style={{
            transform: `translateY(-50%) translateX(${value ? 14 : 0}px)`,
          }}
          className={cn(
            'rounded-full left-0.5 transition-all duration-500 absolute top-1/2 bg-white size-3'
          )}
        />
      </label>

      {label && (
        <label htmlFor={id} className='text-sm select-none cursor-pointer'>
          {label}
        </label>
      )}
    </div>
  );
};
