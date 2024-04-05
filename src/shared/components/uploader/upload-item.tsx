import { UploaderProps } from './uploader.tsx';
import { Icon } from '../icon/icon.tsx';
import { Tooltip } from '../tooltip/tooltip.tsx';
import { PropsWithChildren, ReactNode } from 'react';

interface UploadItemProps
  extends Pick<UploaderProps, 'renderUploadFile' | 'tooltip'> {
  file: File;
  index: number;
  onFileRemove: (file: File, index: number) => void;
}

export const UploadItem = ({
  file,
  index,
  renderUploadFile,
  onFileRemove,
  tooltip,
}: UploadItemProps) => {
  if (renderUploadFile) {
    renderUploadFile(file, index, () => onFileRemove(file, index));
  }

  const Root = ({ children }: PropsWithChildren) => {
    let content: ReactNode | string = file.name;

    if (typeof tooltip === 'function') {
      content = tooltip(file);
    }

    if (!tooltip) return children;

    return <Tooltip content={content}>{children}</Tooltip>;
  };

  const renderFileContent = () => {
    if (file.type.includes('image/')) {
      return (
        <img
          alt={file.name}
          className='aspect-[1/1.2] rounded-md text-xs object-cover'
          width={70}
          height={70 * 1.2}
          src={URL.createObjectURL(file)}
        />
      );
    }

    return (
      <Icon
        className='fill-placeholder'
        width={70}
        height={70 * 1.2}
        name='common/file'
      />
    );
  };

  return (
    <Root>
      <button
        title={file.name}
        className='border-border border border-dotted group rounded-md relative p-1.5'
      >
        <div className='bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100 invisible group-hover:visible absolute inset-0' />

        {renderFileContent()}

        <button
          onClick={() => onFileRemove(file, index)}
          className='pos-abs opacity-0 transition-all duration-300 group-hover:opacity-100 invisible group-hover:visible'
        >
          <Icon className='clamp-4 text-white' name='common/basket' />
        </button>
      </button>
    </Root>
  );
};
