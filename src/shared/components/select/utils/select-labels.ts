import { SelectOption } from '../select.tsx';

export const selectedLabels = (options: SelectOption[], values: number[]) => {
  if (!options || !options.length || !values) return '';

  if (!Array.isArray(values))
    return options.find((el) => el.value === values)?.label || '';

  const filteredObjects = options.filter(
    (option) => option.value && values.includes(option.value)
  );

  filteredObjects.sort(
    (a, b) => values.indexOf(a.value!) - values.indexOf(b.value!)
  );
  const labels = filteredObjects.map((obj) => obj.label);

  return labels.join(',');
};

export const selectedOption = (
  option: SelectOption,
  value: number | number[] | undefined
) => {
  if (!value || !option) return false;

  if (Array.isArray(value)) {
    return value.includes(option.value);
  }

  return option.value === value;
};
