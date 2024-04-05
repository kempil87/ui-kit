import { ChangeEvent, InputHTMLAttributes, ReactNode, useId } from 'react';

import cn from 'classnames';
export interface Switch
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: ReactNode;
  onChange: (value: boolean) => void;
  value: boolean;
  wrapClassName?: HTMLDivElement['className'];
}

export const Switch = ({
  onChange,
  disabled,
  wrapClassName,
  value,
  label,
}: Switch) => {
  const id = useId();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(!JSON.parse(e.target.value));
  };

  return (
    <div className={cn('inline-flex items-center gap-1.5', wrapClassName)}>
      <label
        className={cn(
          'h-7 transition-all duration-300 cursor-pointer select-none w-12 relative rounded-full p-px bg-bg border-border border',
          { 'bg-placeholder': value },
          { '!cursor-not-allowed': disabled }
        )}
        htmlFor={id}
      >
        <input
          hidden
          value={JSON.stringify(value)}
          onChange={change}
          type='checkbox'
          className='focus:outline-0 peer'
          {...{ disabled, id }}
        />
        <div
          style={{
            transform: `translateY(-50%) translateX(${value ? 22 : 0}px)`,
          }}
          className={cn(
            'rounded-full left-0.5 transition-all duration-500 pos-abs-y bg-white size-5'
          )}
        />
      </label>

      {label && (
        <label
          htmlFor={id}
          className={cn('text-sm select-none cursor-pointer', {
            '!cursor-not-allowed': disabled,
          })}
        >
          {label}
        </label>
      )}
    </div>
  );
};
