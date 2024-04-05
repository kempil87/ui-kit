import { useFormContext } from 'react-hook-form';
import { ReactNode } from 'react';

export interface FormErrorProps {
  name: string;
  errorMessage?: ReactNode;
}

export const FormError = ({ name, errorMessage }: FormErrorProps) => {
  const { formState } = useFormContext();

  const error = formState.errors[name]?.message as string;

  if (!error && !errorMessage) return null;

  return (
    <span className='text-red block font-medium mt-2 text-xs pl-2'>
      {errorMessage ?? error}
    </span>
  );
};
