import { IconName } from '../components/icon/icon.tsx';
import { SPRITES_META, SpritesMap } from '../types/icon.ts';

export const getIconMeta = <Key extends keyof SpritesMap>(
  name: IconName<Key>
) => {
  const [spriteName, iconName] = name.split('/') as [Key, SpritesMap[Key]];

  const { filePath, items } = SPRITES_META[spriteName];

  const viewBox = items[iconName]?.viewBox || '';

  const defaultSize = { height: 16, width: 16 };

  if (viewBox) {
    const h = viewBox.split(' ')[3];
    const w = viewBox.split(' ')[2];

    defaultSize.height = Number(h);
    defaultSize.width = Number(w);
  }

  return {
    defaultSize,
    filePath,
    iconName,
    viewBox,
  };
};
