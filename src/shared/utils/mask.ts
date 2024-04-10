import formatWithMask, { parseMask } from './format-with-mask.ts';
import { ParseMaskPatterns } from '../constants/parse-mask-patterns.ts';
import { MaskList } from '../constants/maskList.ts';

class MaskClass {
  format = formatWithMask;

  parse = parseMask;

  patterns = ParseMaskPatterns;

  masks = MaskList;
}

export const Mask = new MaskClass();
