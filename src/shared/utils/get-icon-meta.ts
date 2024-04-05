import { IconProps } from '../components/icon/icon.tsx';
import { SPRITES_META, SpritesMap } from '../types/icon.ts';

export const getIconMeta = <Key extends keyof SpritesMap>({
  name,
  width,
  height,
}: IconProps) => {
  const [spriteName, iconName] = name.split('/') as [Key, SpritesMap[Key]];

  const { filePath, items } = SPRITES_META[spriteName];

  const viewBox = items[iconName]?.viewBox;

  const defaultSize = { height: height ?? 16, width: width ?? 16 };

  if (viewBox) {
    const viewBoxEntries = viewBox.split(' ');

    defaultSize.height = Number(height ?? viewBoxEntries[3]);
    defaultSize.width = Number(width ?? viewBoxEntries[2]);
  }

  return {
    defaultSize,
    filePath,
    iconName,
    viewBox,
  };
};
