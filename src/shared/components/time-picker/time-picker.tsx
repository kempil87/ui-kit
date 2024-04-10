import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { FormError } from '../form-error/form-error.tsx';
import { Input, InputProps } from '../input/input.tsx';
import cn from 'classnames';
import { MouseEvent, useId } from 'react';

type HourFormat = [RegExp, RegExp, ':', RegExp, RegExp, ':', RegExp, RegExp];
type MinFormat = [RegExp, RegExp, ':', RegExp, RegExp];
type SecFormat = [RegExp, RegExp];

type TimePickerFormat = HourFormat | MinFormat | SecFormat;

export const TimePickerFormats: Record<
  'hours' | 'mins' | 'secs',
  TimePickerFormat
> = {
  hours: [/[1-2]/, /[0-9]/, ':', /[1-5]/, /[0-9]/, ':', /[1-5]/, /[0-9]/],
  mins: [/[1-5]/, /[0-9]/, ':', /[1-5]/, /[0-9]/],
  secs: [/[1-5]/, /[0-9]/],
};

interface TimePickerProps {
  handlePickerChange?: (value: string) => void;
  rules?: RegisterOptions;
  name: string;
  format?: TimePickerFormat;
  inputProps?: Partial<InputProps>;
}

const generateColumns = (format: TimePickerFormat) => {
  const hoursNums = Array.from({ length: 23 }, (_, idx) => idx + 1);
  const minutesNums = Array.from({ length: 59 }, (_, idx) => idx + 1);

  const columns = [hoursNums, minutesNums, minutesNums];

  if (format.length === 5) {
    return columns.slice(1);
  }

  if (format.length === 2) {
    return columns.slice(2);
  }

  return columns;
};

export const TimePicker = ({
  handlePickerChange,
  rules,
  format = TimePickerFormats.mins,
  inputProps,
  ...props
}: TimePickerProps) => {
  const { control } = useFormContext();
  const id = useId();

  const columns = generateColumns(format);

  return (
    <Controller
      rules={rules}
      name={props.name}
      control={control}
      render={({ field: { value, onChange } }) => {
        const arrayValues = ((value as string) ?? '').split(':');

        const [h, m, s] = arrayValues;

        const onPickerChange = (
          event: MouseEvent<HTMLButtonElement>,
          value: number,
          column: number
        ) => {
          const parentColumn = event.currentTarget.parentElement;

          parentColumn?.scroll({
            top:
              event.currentTarget.getBoundingClientRect().height * (value - 3),
            behavior: 'smooth',
          });

          arrayValues[column] = String(value).padStart(2, '0');

          if (column === 1 && !h) {
            arrayValues[0] = '00';
          }

          if (column === 2 && !h && !m) {
            arrayValues[0] = '00';
            arrayValues[1] = '00';
          }

          const formatedValue = arrayValues.join(':');

          handlePickerChange?.(formatedValue);
          onChange(formatedValue);
        };

        const onInputChange = (value = '') => {
          const [h, m, s] = value.split(':');

          if (h) {
            const wrapperHour = document.getElementById(`${id}-0`);

            wrapperHour?.scroll({
              top: 40 * (Number.parseInt(h) - 3),
              behavior: 'smooth',
            });
          }

          if (m) {
            const wrapperMins = document.getElementById(`${id}-1`);

            wrapperMins?.scroll({
              top: 40 * (Number.parseInt(m) - 3),
              behavior: 'smooth',
            });
          }

          if (s) {
            const wrapperSeconds = document.getElementById(`${id}-2`);

            wrapperSeconds?.scroll({
              top: 40 * (Number.parseInt(s) - 3),
              behavior: 'smooth',
            });
          }
        };

        return (
          <div className='flex flex-col w-fit'>
            <div className='relative group'>
              <Input
                textChange={onInputChange}
                maxLength={format?.length}
                mask={format}
                name={props.name}
                {...inputProps}
              />

              <div className='absolute z-30 opacity-0 group-focus-within:translate-y-0 pointer-events-none group-focus-within:pointer-events-auto group-focus-within:opacity-100 transition-all duration-300 top-[120%] inset-x-0 h-56 bg-bg px-3 py-2 translate-y-6 border-border border rounded-md w-full'>
                <div
                  className='grid'
                  style={{
                    gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <div
                      id={`${id}-${colIndex}`}
                      key={colIndex}
                      className='overflow-y-auto max-h-52'
                    >
                      {col.map((num) => (
                        <button
                          key={num}
                          onClick={(event) =>
                            onPickerChange(event, num, colIndex)
                          }
                          className={cn(
                            'flex-center text-placeholder py-2 rounded-md w-full',
                            {
                              'bg-accent text-white':
                                (colIndex === 0 &&
                                  Number.parseInt(h) === num) ||
                                (colIndex === 1 &&
                                  Number.parseInt(m) === num) ||
                                (colIndex === 2 && Number.parseInt(s) === num),
                            }
                          )}
                        >
                          {String(num).padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <FormError name={props.name} />
          </div>
        );
      }}
    />
  );
};
