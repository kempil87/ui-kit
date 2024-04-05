import { ChangeEvent, ReactNode, TextareaHTMLAttributes, useRef } from 'react';
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

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
  _prefix?: ReactNode;
  allowClear?: boolean;
  onClear?: () => void;
  label?: string;
  mask?: Mask;
  textChange?: (value: string, unmasked?: string) => void;
  rules?: UseControllerProps['rules'];
  name: string;
  maxHeight?: number | string;
  defaultHeight?: number | string;
}

export const Textarea = ({
  _prefix,
  label,
  onClear,
  allowClear = false,
  mask,
  textChange,
  maxHeight = 200,
  defaultHeight = 50,
  rules,
  ...props
}: TextareaProps) => {
  const { control, resetField } = useFormContext();
  const prefixRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefixRef.current && textareaRef.current) {
      const paddingLeft = `${
        prefixRef.current.getBoundingClientRect().width + 14
      }px`;

      textareaRef.current.style.paddingLeft = paddingLeft;

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
        const resize = (value?: number) => {
          if (!textareaRef.current || !wrapRef.current) return;

          wrapRef.current.style.height = `${
            value || textareaRef.current.scrollTop
          }px`;
          textareaRef.current.style.height = `${
            value || textareaRef.current.scrollTop
          }px`;
        };

        const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
          let { value: text } = target;
          if (mask) {
            text = formatWithMask({ text, mask }).masked;
          }

          if (props.maxLength && text.length >= props.maxLength) {
            text = text.slice(0, props.maxLength);
          }

          textChange?.(text, formatWithMask({ text, mask }).unmasked);
          field.onChange(text);

          resize();
        };

        const handleClear = () => {
          resetField(props.name);
          onClear?.();

          resize(Number(defaultHeight));
        };

        return (
          <div className='flex flex-col'>
            <div
              ref={wrapRef}
              className='relative group'
              style={{
                minHeight: defaultHeight,
                height: defaultHeight,
                maxHeight,
              }}
            >
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

              <textarea
                style={{
                  minHeight: defaultHeight,
                  height: defaultHeight,
                  maxHeight,
                }}
                ref={textareaRef}
                className={cn(
                  'appearance-none resize-none w-full focus:placeholder:opacity-100 transition-all duration-300 border border-border bg-bg caret-placeholder text-sm placeholder:text-placeholder focus:border-accent active:border-accent focus:outline-0 py-1.5 px-3.5 rounded-md',
                  { 'pr-8': allowClear },
                  { 'placeholder:opacity-0': label }
                )}
                {...props}
                onChange={handleChange}
                value={field.value ?? ''}
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
};
