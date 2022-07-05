import Input from '@/components/common/Input/Input';
import { RefreshIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
  password: string;
  confirm_password: string;
};

export default function FormNewPassword({ loading, onSubmit }: any) {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('senha é obrigatória')
      .matches(/[a-zA-Z]/, 'senha deve conter pelo menos uma letra minuscula e uma maiuscula')
      .min(8, 'senha deve conter mais que 8 caracterisiticas')
      .trim(),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'senhas não são iguais')
      .trim()
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col justify-center px-10'>
        <div className='mb-5 mt-8'>
          <Input
            name={'password'}
            id={'password'}
            type={'password'}
            register={register('password')}
            errors={errors.password?.message}
            loading={loading}
            placeholder='nova senha'
          />
        </div>
        <div className='mb-10'>
          <Input
            name={'confirm_password'}
            id={'confirm_password'}
            type={'password'}
            register={register('confirm_password')}
            errors={errors.confirm_password?.message}
            loading={loading}
            placeholder='confirme a nova senha'
          />
        </div>

        {!loading ? (
          <button
            type='submit'
            className='w-full flex text-md font-semibold justify-center uppercase py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange-400 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            salvar
          </button>
        ) : (
          <button
            type='submit'
            className='w-full flex items-center gap-x-2 text-md font-semibold justify-center uppercase py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-400'
          >
            salvando
            <RefreshIcon className='h-5 w-5 animate-spin' />
          </button>
        )}
      </div>
    </form>
  );
}
