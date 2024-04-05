import { ExtensionOptions } from './uploader.tsx';

const extension = (name: string) => name.split('.').pop() ?? '';

interface Props {
  extensionOptions: ExtensionOptions;
  files: File[];
}
export const checkExtension = ({ extensionOptions, files }: Props) => {
  if (!extensionOptions)
    return { hasErrorByExtension: false, unCheckFiles: [] };

  const filterElems: File[] = [];

  for (const file of files) {
    if (!extensionOptions.list.includes(extension(file.name))) {
      filterElems.push(file);
    }
  }

  return {
    hasErrorByExtension: Boolean(filterElems.length),
    unCheckFiles: filterElems,
  };
};
