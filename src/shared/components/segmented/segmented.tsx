import { HTMLAttributes, ReactNode, useRef } from 'react';
import cn from 'classnames';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
export interface SegmentedProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  wrapClassName?: HTMLDivElement['className'];
  options: SegmentedOptions;
  onChange?: (value: SegmentOption | string) => void;
  defaultIndex?: number;
}

type SegmentedOptions = Array<SegmentOption | string>;

interface SegmentOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export const Segmented = ({
  wrapClassName,
  options,
  onChange,
  defaultIndex,
}: SegmentedProps) => {
  const segmentRef = useRef<HTMLDivElement>(null);
  const segmentButtonRef = useRef<HTMLButtonElement>(null);

  const handleChange = (option: SegmentOption | string) => {
    if (!segmentRef.current) return;

    const currentIndex = options.findIndex((o) => o === option);

    const translateX = 100 * currentIndex;
    segmentRef.current.style.transform = `translateX(${translateX}%) translateY(-50%)`;

    onChange?.(option);
  };

  useIsomorphicLayoutEffect(() => {
    if (defaultIndex) {
      if (!segmentRef.current || !options.at(defaultIndex)) return;

      const translateX = 100 * defaultIndex;
      segmentRef.current.style.transform = `translateX(${translateX}%) translateY(-50%)`;
    }
  }, []);

  if (!options.length) return null;

  return (
    <div className={cn('w-fit relative overflow-x-auto', wrapClassName)}>
      <div
        style={{
          width: `calc(${100 / options.length}%)`,
        }}
        ref={segmentRef}
        className='bg-white transition-transform duration-300 rounded opacity-70 h-8 pos-abs-y z-10 '
      />
      <div
        style={{
          gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
        }}
        className='bg-accent relative grid border-border border rounded-md'
      >
        {options.map((option) => (
          <button
            ref={segmentButtonRef}
            disabled={typeof option !== 'string' && option.disabled}
            key={typeof option === 'string' ? option : option.value}
            onClick={() => handleChange(option)}
            className={cn(
              'py-1.5 px-1.5 disabled:hover:bg-transparent disabled:cursor-not-allowed hover:bg-bg transition-all duration-300 rounded-md'
            )}
          >
            {typeof option === 'string' ? option : option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
