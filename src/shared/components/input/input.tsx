import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import cn from 'classnames';
import { IconButton } from '../icon-button/icon-button.tsx';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import { Mask } from '../../types/mask.ts';
import formatWithMask from '../../utils/format-with-mask.ts';
import {
  Controller,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import { enabledNumberKeyEvent } from './common/enabled-keyboard-options.ts';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
  _prefix?: ReactNode;
  allowClear?: boolean;
  onClear?: () => void;
  label?: string;
  mask?: Mask;
  textChange?: (value: string, unmasked?: string) => void;
  rules?: UseControllerProps['rules'];
  name: string;
  type?: 'number' | 'text';
}

export interface InputMethods {
  focus: () => void;
  blur: () => void;
}

export const Input = forwardRef(
  (
    {
      _prefix,
      label,
      onClear,
      allowClear = false,
      mask,
      textChange,
      rules,
      ...props
    }: InputProps,
    parentRef
  ) => {
    const { control, resetField } = useFormContext();
    const prefixRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    const imperativeFocus = () => {
      if (!inputRef.current) return;

      inputRef.current.focus();
    };

    const imperativeBlur = () => {
      if (!inputRef.current) return;

      inputRef.current.blur();
    };

    useImperativeHandle(parentRef, () => ({
      focus: imperativeFocus,
      blur: imperativeBlur,
    }));

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
      <Controller
        rules={rules}
        name={props.name}
        control={control}
        render={({ field, fieldState }) => {
          const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
            let { value: text } = target;

            if (mask) {
              text = formatWithMask({ text, mask }).masked;
            }

            if (props.maxLength && text.length >= props.maxLength) {
              text = text.slice(0, props.maxLength);
            }

            textChange?.(text, formatWithMask({ text, mask }).unmasked);
            field.onChange(text);
          };

          const handleClear = () => {
            resetField(props.name);
            onClear?.();
          };

          return (
            <div className='flex flex-col'>
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
                      { '!top-0 !text-xs !pl-2': field.value }
                    )}
                  >
                    {label}
                  </label>
                )}

                <input
                  ref={inputRef}
                  className={cn(
                    'appearance-none h-9 w-full focus:placeholder:text-placeholder transition-all duration-300 border border-border bg-bg caret-placeholder text-sm placeholder:text-placeholder focus:border-accent active:border-accent focus:outline-0 py-1 px-3.5 rounded-md',
                    { 'pr-8': allowClear },
                    { 'placeholder:text-transparent': label }
                  )}
                  {...props}
                  onChange={handleChange}
                  value={field.value ?? ''}
                  {...(props.type === 'number' && enabledNumberKeyEvent)}
                />

                {field.value && allowClear && (
                  <IconButton
                    title='Clear'
                    onClick={handleClear}
                    className={cn('pos-abs-y right-1 size-6')}
                    iconProps={{
                      name: 'common/close',
                      className: 'size-3.5',
                    }}
                  />
                )}
              </div>

              {fieldState.error?.message && (
                <span className='text-red block font-medium mt-2 text-xs pl-2'>
                  {fieldState.error.message}
                </span>
              )}
            </div>
          );
        }}
      />
    );
  }
);

Input.displayName = 'Input';
