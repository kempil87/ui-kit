import { SVGProps } from 'react';

import cn from 'classnames';

import { SpritesMap } from '../../types/icon.ts';
import { getIconMeta } from '../../utils/get-icon-meta.ts';

export type AnyIconName = {
  [Key in keyof SpritesMap]: IconName<Key>;
}[keyof SpritesMap];

export type IconName<Key extends keyof SpritesMap> =
  `${Key}/${SpritesMap[Key]}`;

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, 'name' | 'type'> {
  name: AnyIconName;
  fillColor?: string;
  gradient?: boolean;
  strokeColor?: string;
}

export const Icon = ({ name, className, gradient, ...props }: IconProps) => {
  const { viewBox, filePath, iconName, defaultSize } = getIconMeta(name);
  const innerStrokeColor = 'url(#gradient#5BC0D1)';
  const innerFillColor = 'url(#gradient#5BC0D1)';

  return (
    <svg
      aria-hidden
      focusable='false'
      height={defaultSize.height}
      viewBox={viewBox}
      width={defaultSize.width}
      className={cn(
        'box-content inline-block select-none fill-current',
        className
      )}
      {...props}
    >
      {gradient && (
        <defs>
          <linearGradient
            gradientUnits='userSpaceOnUse'
            id='gradient#5BC0D1'
            x1='-8.16'
            x2='37.678'
            y1='2.78261'
            y2='8.81458'
          >
            <stop offset='0.0639818' stopColor='#5BC0D1' />
            <stop offset='1' stopColor='#20479A' />
          </linearGradient>
        </defs>
      )}
      <use
        {...(gradient && {
          fill: innerFillColor,
          stroke: innerStrokeColor,
        })}
        xlinkHref={`/images/svg-sprites/${filePath}#${iconName}`}
      />
    </svg>
  );
};
