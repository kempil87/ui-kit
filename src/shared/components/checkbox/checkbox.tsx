import { ChangeEvent, InputHTMLAttributes, ReactNode, useId } from 'react';

import cn from 'classnames';
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: ReactNode;
  onChange: (value: boolean) => void;
  value: boolean;
  indeterminate?: boolean;
  wrapClassName?: HTMLDivElement['className'];
}

export const Checkbox = ({
  onChange,
  disabled,
  wrapClassName,
  value,
  indeterminate,
  label,
}: CheckboxProps) => {
  const id = useId();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(!JSON.parse(e.target.value));
  };

  return (
    <div
      className={cn(
        'inline-flex group w-fit items-center gap-2',
        wrapClassName
      )}
    >
      <label
        className={cn(
          'transition-all basic-checkbox duration-300 cursor-pointer select-none clamp-4 relative rounded p-px bg-bg ring-border ring-1',
          { active: value },
          { indeterminate },
          { '!cursor-not-allowed': disabled },
          { 'group-hover:ring-white/60': !disabled && !value }
        )}
        htmlFor={id}
      >
        <input
          hidden
          value={JSON.stringify(value)}
          onChange={change}
          type='checkbox'
          className='focus:outline-0 appearance-none'
          {...{ disabled, id }}
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
