import { useCallback } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { RefreshIcon } from '@heroicons/react/outline';
import Input from '@/components/common/Input/Input';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
  email: string;
  password: string;
  confirm_password: string;
};

interface INewAccount {
  loading: boolean;
  onSubmit: any;
}

export default function FormCreate({ onSubmit, loading }: INewAccount) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('formato de e-mail inválido').required('e-mail é obrigatório').trim(),
    password: Yup.string()
      .required('senha é obrigatório')
      .min(8, 'senha não pode conter menos que 8 caracteres')
      .matches(/[a-zA-Z]/, 'senha deve conter pelo menos uma letra minuscula e uma maiuscula')
      .trim(),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'senhas não são iguais')
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  const handleRedirect = useCallback(() => {
    Router.push('/public/authentication/login');
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col justify-center px-10'>
        <div className='mb-5 mt-4'>
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

        <div className='mb-5'>
          <Input
            name='password'
            id='password'
            type='password'
            register={register('password')}
            errors={errors.password?.message}
            loading={loading}
            placeholder='senha'
          />
        </div>

        <div className='mb-10'>
          <Input
            name='confirm_password'
            id='confirm_password'
            type='password'
            register={register('confirm_password')}
            errors={errors.confirm_password?.message}
            loading={loading}
            placeholder='confirmar senha'
          />
        </div>

        {!loading ? (
          <button
            type='submit'
            className='w-full flex text-md font-semibold justify-center uppercase py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange-400 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            criar conta
          </button>
        ) : (
          <button
            type='submit'
            className='w-full flex items-center gap-x-2 text-md font-semibold justify-center uppercase py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-400'
          >
            gerando usuario
            <RefreshIcon className='h-5 w-5 animate-spin' />
          </button>
        )}

        <div className='mt-6'>
          <button
            onClick={handleRedirect}
            type='button'
            className='w-full flex text-md font-semibold justify-center uppercase py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600'
          >
            já sou cadastrado
          </button>
        </div>
      </div>
    </form>
  );
}
