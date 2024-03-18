import { useEffect, useRef } from 'react';

export interface CircleBarProps {
  size?: number;
  strokeWidth?: number;
  value: number;
  color?: string;
}

export const CircleBar = ({
  size = 100,
  value = 0,
  color = '#1CA3B3',
  strokeWidth = 6,
}: CircleBarProps) => {
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.strokeDasharray = String(360 * (value / 100));
    }
  }, [value]);

  return (
    <div className='relative inline-block'>
      <svg
        role='presentation'
        className='relative'
        {...{ width: size, height: size }}
      >
        <circle
          ref={ref}
          className='z-50 absolute'
          r='47'
          cx='50'
          stroke={color}
          cy='50'
          style={{
            transition:
              'stroke-dashoffset 0.5s ease 0s, stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s, stroke-width 0.06s ease 0.3s, opacity 0.3s ease 0s',
          }}
          strokeLinecap='round'
          {...{ strokeWidth }}
          strokeDashoffset={0}
        />
      </svg>

      <span className='pos-abs text-white'>{value} %</span>
    </div>
  );
};
