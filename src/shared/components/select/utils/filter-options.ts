import { SelectOption } from '../select.tsx';

export const filterOptions = (
  options: SelectOption[],
  input: string
): SelectOption[] => {
  if (!options) return [];

  if (!input) return options;

  const regex = new RegExp(input, 'i');

  return options.filter(({ label }) => regex.test(label));
};
