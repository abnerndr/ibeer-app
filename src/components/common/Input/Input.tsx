import { InputProps } from '@/components/common/Input/types';
export default function Input({ label, name, id, type, value, register, errors, loading, ...props }: InputProps) {
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
          autoComplete='off'
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>
      {errors && <p className='text-sm text-red-500 flex items-center gap-x-3'>{errors}</p>}
    </div>
  );
}
