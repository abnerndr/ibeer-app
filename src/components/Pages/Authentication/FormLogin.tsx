import { useForm } from 'react-hook-form';
import { RefreshIcon } from '@heroicons/react/outline';
import Input from '@/components/common/Input/Input';
import { FcGoogle } from 'react-icons/fc';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';

type FormValues = {
  email: string;
  password: string;
};

interface ILogin {
  loading: boolean;
  onSubmit: any;
  signInWithGoogle: any;
}

export default function FormLogin({ onSubmit, loading, signInWithGoogle }: ILogin) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('formato de e-mail inválido').required('e-mail é obrigatório').trim(),
    password: Yup.string().required('senha é obrigatório').trim()
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col justify-center px-10'>
        <div className='mb-6 mt-4'>
          <Input
            name='email'
            id='email'
            type='email'
            register={register('email')}
            errors={errors.email?.message}
            loading={loading}
            placeholder='e-mail'
          />
        </div>

        <div className='mb-12'>
          <Input
            name='password'
            id='password'
            type='password'
            register={register('password')}
            errors={errors.password?.message}
            loading={loading}
            placeholder='senha'
          />
          <div className='mt-3'>
            <Link href={'/public/authentication/new-account'}>
              <a className='text-orange-400 text-md font-medium'>criar uma conta</a>
            </Link>
          </div>
        </div>

        {!loading ? (
          <button
            type='submit'
            className='w-full flex text-md font-semibold justify-center uppercase py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange-400 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            accessar
          </button>
        ) : (
          <button
            type='submit'
            className='w-full flex items-center gap-x-2 text-md font-semibold justify-center uppercase py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-400'
          >
            acessando
            <RefreshIcon className='h-5 w-5 animate-spin' />
          </button>
        )}

        <div className='mt-8'>
          <button
            onClick={signInWithGoogle}
            type='button'
            className='w-full flex items-center gap-x-2 text-md font-semibold justify-center uppercase py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600'
          >
            <FcGoogle className='w-6 h-6' />
            acessar com o google
          </button>
        </div>
      </div>
    </form>
  );
}
