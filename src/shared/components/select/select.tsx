import { ChangeEvent, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import cn from 'classnames';
import { Icon } from '../icon/icon';
import { Controller, useFormContext } from 'react-hook-form';
import { selectedLabels, selectedOption } from './utils/select-labels.ts';
import { SelectLabel } from './select-label.tsx';
import { filterOptions } from './utils/filter-options.ts';

export interface SelectOption {
  label: string;
  value: number;
}

type SelectValues = number | number[] | null;

export interface SelectProps {
  name: string;
  options: SelectOption[];
  handleChange?: (name: string, values: SelectValues) => void;
  multiple?: boolean;
  withSearch?: boolean;
  notFoundText?: string;
  placeholder?: string;
  renderClearAll?: (onClear: () => void, values: SelectValues) => void;
  onSearch?: (input: string) => void;
}

export const Select = ({
  options,
  name,
  handleChange,
  placeholder,
  renderClearAll,
  onSearch,
  withSearch = true,
  multiple,
  notFoundText = 'Ничего не найдено',
}: SelectProps) => {
  const { control, formState } = useFormContext();
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const searchWrapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchValue, setSearchValue] = useState('');

  const onFocus = () => {
    const isMenuVisible = menuRef.current?.dataset.visible === 'true';

    if (isMenuVisible) {
      onBlur();

      return;
    }
    if (menuRef.current && ref.current && arrowRef.current) {
      menuRef.current.dataset.visible = 'true';
      ref.current.classList.add('!border-placeholder');
      arrowRef.current.classList.add('rotate-0');
    }

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const onBlur = () => {
    if (menuRef.current && ref.current && arrowRef.current) {
      menuRef.current.dataset.visible = 'false';

      ref.current.classList.remove('!border-placeholder');
      arrowRef.current.classList.remove('rotate-0');
    }

    clearSearchField();
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: currentValue } = e.target;

    if (!currentValue) {
      clearSearchField();

      return;
    }
    onSearch?.(currentValue);
    setSearchValue(currentValue);

    const parent = searchWrapRef.current;
    if (!parent) return;

    const maxWidth = (ref.current?.getBoundingClientRect().width ?? 0) - 50;

    const currentWidth = Number(parent.style.width.slice(0, -2));

    if (parent && maxWidth >= currentWidth) {
      parent.style.width = `${e.target.value.length * 8}px`;
    }
  };

  const clearSearchField = () => {
    setSearchValue('');
    onSearch?.('');

    if (!searchWrapRef.current) return;

    searchWrapRef.current.style.width = `4px`;
  };

  useOnClickOutside(ref, onBlur);

  return (
    <div className='flex flex-col'>
      <div
        ref={ref}
        className='relative rounded-md border border-border transition-all'
      >
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => {
            const selectLabels = selectedLabels(options, value);

            const onSelectChange = (optionValue: number | null) => {
              if (!optionValue) return;

              const newValue = (() => {
                if (!multiple) {
                  return value === optionValue ? null : optionValue;
                }

                const valuesList: Set<number> = new Set(value);

                if (valuesList.has(optionValue)) {
                  valuesList.delete(optionValue);
                } else {
                  valuesList.add(optionValue);
                }

                return [...valuesList];
              })();

              onChange(newValue);
              handleChange?.(name, newValue);

              !multiple && onBlur();
              clearSearchField();
            };

            const clearAll = () => {
              onChange([]);
              handleChange?.(name, []);

              !multiple && onBlur();
              clearSearchField();
            };

            return (
              <>
                <button
                  className='flex group min-h-[36px] h-full w-full min-w-fit cursor-pointer items-center rounded-md bg-bg outline-none'
                  onClick={onFocus}
                >
                  <div
                    className={cn(
                      'relative truncate text-sm flex items-center flex-wrap gap-1.5 px-5 py-1 text-white/60',
                      {
                        '!text-white': selectLabels?.length,
                      }
                    )}
                  >
                    <SelectLabel
                      {...{
                        selectLabels,
                        placeholder,
                        onRemove: onSelectChange,
                      }}
                    />

                    {withSearch && (
                      <div ref={searchWrapRef} className='w-1'>
                        <input
                          ref={searchInputRef}
                          onChange={handleSearch}
                          className='w-full bg-transparent '
                          value={searchValue}
                        />
                      </div>
                    )}
                  </div>

                  <Icon
                    ref={arrowRef}
                    name='common/arrow'
                    className={cn(
                      'absolute right-3 peer-data-[visible=true]:rotate-0 size-3.5 -rotate-180 fill-placeholder transition-all duration-300'
                    )}
                  />
                </button>

                <div
                  data-visible='false'
                  ref={menuRef}
                  className='peer data-[visible=false]:opacity-0 data-[visible=false]:invisible data-[visible=false]:translate-y-6 bg-bg absolute top-[120%] z-40 max-h-80 w-full space-y-2 overflow-y-auto rounded-md border border-border bg-dark px-3 py-2 transition-all'
                >
                  {renderClearAll?.(clearAll, value) ||
                    (value && (
                      <button className='text-sm' onClick={clearAll}>
                        Clear all
                      </button>
                    ))}

                  {filterOptions(options, searchValue)?.length ? (
                    filterOptions(options, searchValue).map((option) => {
                      const isSelected = selectedOption(option, value);

                      return (
                        <button
                          key={option.value}
                          className={cn(
                            'relative flex w-full cursor-pointer items-center justify-between break-words rounded-md px-3 py-1 text-start text-sm text-placeholder transition-all hover:text-white',
                            { '!text-white': isSelected }
                          )}
                          onClick={() => onSelectChange(option.value)}
                        >
                          {option.label}

                          {isSelected && (
                            <Icon name='common/done' className='size-3.5' />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <span className='text-sm block pl-3 opacity-75'>
                      {notFoundText}
                    </span>
                  )}
                </div>
              </>
            );
          }}
        />
      </div>

      {formState.errors[name]?.message && (
        <div className='text-red font-medium mt-2 text-xs pl-2'>
          {formState.errors[name]?.message as string}
        </div>
      )}
    </div>
  );
};
