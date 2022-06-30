import { InputProps } from '@/components/common/Input/types';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
export default function Input({
  label,
  name,
  id,
  type,
  value,
  register,
  errors,
  loading,
  placeholder,
  ...props
}: InputProps) {
  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div className='mt-1'>
        <input
          {...register}
          {...props}
          id={id}
          name={name}
          type={type}
          defaultValue={value}
          disabled={loading}
          placeholder={placeholder}
          autoComplete='off'
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 sm:text-sm'
        />
      </div>
      {errors && (
        <p className='pl-1 pt-1 text-sm text-red-500 flex items-center gap-x-1'>
          {errors}
          <div>
            <ExclamationCircleIcon className='h-4 w-4' />
          </div>
        </p>
      )}
    </div>
  );
}
