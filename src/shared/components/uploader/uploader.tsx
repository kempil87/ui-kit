import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import {
  DragEvent,
  InputHTMLAttributes,
  ReactNode,
  useId,
  useRef,
} from 'react';
import cn from 'classnames';
import { checkExtension } from './check-extension.ts';
import { checkSize } from './check-size.ts';
import { UploadItem } from './upload-item.tsx';
import { FormError } from '../form-error/form-error.tsx';

export interface UploaderProps {
  name: string;
  accept?: boolean;
  className?: HTMLDivElement['className'];
  extensionOptions?: ExtensionOptions;
  sizeOptions?: SizeOptions;
  onPreviewRemove?: (file: File) => void;
  rules?: RegisterOptions;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  renderUploader?: (files: File[]) => ReactNode;
  renderUploadFile?: (
    file: File,
    index: number,
    onFileRemove: (file: File, index: number) => void
  ) => ReactNode;
  multiple?: boolean;
  disabled?: boolean;
  showUploadList?: boolean;
  handleChange?: (name: string, files: File[]) => void;
  tooltip?: boolean | TooltipCallback;
}

type TooltipCallback = (file: File) => ReactNode;

export type ExtensionOptions = {
  list: string[];
  onError?: (files: File[]) => void;
};

export type SizeOptions = {
  value: number;
  onError?: (files: File[]) => void;
};

type FileArray = Array<File>;

export const Uploader = ({
  rules,
  name,
  extensionOptions,
  sizeOptions,
  onPreviewRemove,
  handleChange,
  multiple,
  tooltip = true,
  renderUploader,
  renderUploadFile,
  disabled,
  className,
  showUploadList = true,
  inputProps,
}: UploaderProps) => {
  const { control } = useFormContext();
  const id = useId();

  const inputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const uploadDragTextRef = useRef<HTMLSpanElement>(null);

  const handleFocus = () => {
    if (!inputRef.current || disabled) return;

    inputRef.current.click();
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        const handleUpload = (fileList: FileList | null) => {
          if (!fileList || disabled) return;

          const files = Array.from(fileList);

          if (extensionOptions) {
            const { hasErrorByExtension, unCheckFiles } = checkExtension({
              extensionOptions,
              files,
            });

            if (hasErrorByExtension) {
              return extensionOptions?.onError?.(unCheckFiles);
            }
          }

          if (sizeOptions?.value) {
            const { hasErrorBySize, unCheckFiles } = checkSize({
              sizeOptions,
              files,
            });

            if (hasErrorBySize) {
              return sizeOptions?.onError?.(unCheckFiles);
            }
          }

          const returnedFiles = ((): FileArray => {
            if (Array.isArray(value as FileArray) && multiple) {
              return value.concat(files);
            }

            return files;
          })();

          onChange(returnedFiles);
          handleChange?.(name, returnedFiles);
        };

        const onDragStartHandler = (e: DragEvent<HTMLButtonElement>) => {
          e.preventDefault();

          if (!uploadDragTextRef.current || disabled) return;

          uploadDragTextRef.current.dataset.visible = 'true';
          e.currentTarget.dataset.uploading = 'true';
        };

        const onLeaveHandler = (e: DragEvent<HTMLButtonElement>) => {
          e.preventDefault();

          if (!uploadDragTextRef.current || disabled) return;

          uploadDragTextRef.current.dataset.visible = 'false';
          e.currentTarget.dataset.uploading = 'false';
        };

        const onDragOverHandler = (e: DragEvent<HTMLButtonElement>) => {
          e.preventDefault();

          if (!uploadDragTextRef.current || disabled) return;

          uploadDragTextRef.current.dataset.visible = 'true';
          e.currentTarget.dataset.uploading = 'true';
        };

        const onDropHandler = (e: DragEvent<HTMLButtonElement>) => {
          e.preventDefault();

          if (!uploadDragTextRef.current || disabled) return;

          uploadDragTextRef.current.dataset.visible = 'false';
          e.currentTarget.dataset.uploading = 'false';

          handleUpload(e.dataTransfer.files);
        };

        const onFileRemove = (file: File, index: number) => {
          if (!Array.isArray(value)) return;

          const returnedFiles = (value as FileArray).filter(
            (_, idx) => idx !== index
          );

          onPreviewRemove?.(file);
          onChange(returnedFiles);
          handleChange?.(name, returnedFiles);
        };

        return (
          <div className='space-y-1'>
            <div
              className={cn({ 'w-fit': renderUploader })}
              onClick={handleFocus}
              ref={uploadRef}
            >
              <input
                ref={inputRef}
                className='hidden'
                hidden
                id={id}
                onChange={(e) => handleUpload(e.target.files)}
                type='file'
                disabled={inputProps?.disabled || disabled}
                multiple={inputProps?.multiple || multiple}
                {...inputProps}
              />

              {renderUploader?.((value as FileArray) || []) || (
                <button
                  onDragLeave={onLeaveHandler}
                  onDragOver={onDragOverHandler}
                  onDragStart={onDragStartHandler}
                  onDrop={onDropHandler}
                  disabled={disabled}
                  data-uploading='false'
                  className={cn(
                    'flex min-w-full group relative disabled:cursor-not-allowed disabled:hover:border-accent disabled:bg-placeholder/30 select-none items-center gap-4 rounded-md border border-dotted border-accent bg-bg p-4 hover:border-placeholder',
                    className
                  )}
                >
                  <div className='flex-center group-data-[uploading=true]:opacity-30 transition-all duration-300 w-full gap-2 flex-col'>
                    <svg
                      className='stroke-placeholder'
                      data-testid='geist-icon'
                      fill='none'
                      height='24'
                      shapeRendering='geometricPrecision'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      viewBox='0 0 24 24'
                      width='24'
                      aria-label='Empty inbox'
                    >
                      <path d='M22 12h-6l-2 3h-4l-2-3H2'></path>
                      <path d='M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z'></path>
                    </svg>

                    <span className='text-sm text-placeholder font-bold'>
                      Click or drag file to this area to upload
                    </span>
                  </div>

                  <span
                    data-visible='false'
                    ref={uploadDragTextRef}
                    className='absolute z-20 inset-x-0 mx-auto text-xs scale-0 origin-bottom data-[visible=true]:scale-100 data-[visible=true]:visible data-[visible=true]:translate-y-0 translate-y-3 invisible font-medium text-gray transition-all duration-300'
                  >
                    Drop for upload
                  </span>
                </button>
              )}

              {showUploadList &&
                Array.isArray(value) &&
                Boolean(value.length) && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className='flex flex-wrap min-w-full mt-2 select-none items-center gap-4 rounded-md border border-dotted border-accent bg-bg p-4'
                  >
                    {(value as FileArray).map((file, index) => (
                      <UploadItem
                        key={`${file.lastModified}${index}`}
                        {...{
                          file,
                          index,
                          renderUploadFile,
                          onFileRemove,
                          tooltip,
                        }}
                      />
                    ))}
                  </div>
                )}
            </div>

            <FormError name={name} />
          </div>
        );
      }}
    />
  );
};
