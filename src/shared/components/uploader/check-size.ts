import { SizeOptions } from './uploader.tsx';

interface Props {
  sizeOptions: SizeOptions;
  files: File[];
}

export const checkSize = ({ sizeOptions, files }: Props) => {
  if (!sizeOptions || !sizeOptions.value)
    return { hasErrorBySize: false, unCheckFiles: [] };

  const filterElems: File[] = [];

  for (const file of files) {
    if (file.size > sizeOptions.value) {
      filterElems.push(file);
    }
  }

  return {
    hasErrorBySize: Boolean(filterElems.length),
    unCheckFiles: filterElems,
  };
};
