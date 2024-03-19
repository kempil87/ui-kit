import { Chip } from '../chip/chip.tsx';
import { SelectOption } from './select.tsx';

export interface SelectLabelProps {
  selectLabels: string | SelectOption[];
  placeholder?: string;
  onRemove?: (option: number | null) => void;
}

export const SelectLabel = ({
  selectLabels,
  placeholder,
  onRemove,
}: SelectLabelProps) => {
  const handleRemove = (value: number) => {
    onRemove?.(value || null);
  };

  if (!selectLabels || !selectLabels.length) {
    return placeholder ?? '';
  }

  if (Array.isArray(selectLabels)) {
    return selectLabels.map(({ label, value }, index) => (
      <Chip
        onRemove={() => handleRemove(value)}
        {...(index && { className: 'ml-1.5' })}
      >
        {label}
      </Chip>
    ));
  }

  return selectLabels;
};
