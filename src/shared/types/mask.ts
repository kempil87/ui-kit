export type MaskItem = string | RegExp | [RegExp];

export type MaskArray = Array<MaskItem>;

export type Mask = MaskArray | ((value?: string) => MaskArray);

export type FormatWithMaskProps = {
  text?: string;

  mask?: Mask;

  obfuscationCharacter?: string;

  maskAutoComplete?: boolean;
};

export type FormatWithMaskResult = {
  masked: string;
  unmasked: string;
  obfuscated: string;
};

export type ParseMaskProps = {
  text?: string;

  pattern: RegExp;
};
