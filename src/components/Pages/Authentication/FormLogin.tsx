import Input from '@/components/common/Input/Input';
import { useForm } from 'react-hook-form';
import { FormValues } from './types';
export default function FormLogin({ loading, onSubmit }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Input
          id='email'
          name='email'
          label='e-mail'
          type='email'
          errors={errors.email?.message}
          register={register('email')}
          loading={loading}
        />
      </div>

      <div className='mb-4'>
        <Input
          id='password'
          name='password'
          label='senha'
          type='password'
          errors={errors.password?.message}
          register={register('password')}
          loading={loading}
        />
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <input
            id='remember-me'
            name='remember-me'
            type='checkbox'
            className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
          />
          <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
            lembre-se
          </label>
        </div>

        <div className='text-sm'>
          <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
            esqueceu sua senha?
          </a>
        </div>
      </div>

      <div>
        <button
          type='submit'
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          acessar
        </button>
      </div>
    </form>
  );
}
