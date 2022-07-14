import Input from '@/components/common/Input/Input';
import InputSchema from '@/components/common/Input/InputSchema';
import { ArrowLeftIcon, RefreshIcon } from '@heroicons/react/outline';
import { Controller, useForm } from 'react-hook-form';
import { auth } from '@/services/firebase';
import { FormValues, IProfileForm } from './types';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function ProfileForm({ loading, setLoading, signOut }: IProfileForm) {
  const [inputValue, setInputValue] = useState(null);
  const { profile, updatedProfile }: any = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    // fullname: InputSchema.fullname,
    // email: InputSchema.email
    // phone: InputSchema.phone
  });
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors }
  } = useForm<FormValues | any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: profile?.email
    }
  });

  const onSubmit = useCallback(async ({ displayName }: any) => {
    setLoading(true);
    const response = await updatedProfile({ displayName, setLoading });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <Controller
          control={control}
          name='displayName'
          defaultValue={profile?.displayName}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              id='displayName'
              type='text'
              label='nome completo'
              register={register('displayName')}
              errors={''}
              loading={loading}
              placeholder='ex: Lucas Tavares'
              {...rest}
            />
          )}
        />
      </div>

      <div className='mb-4'>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, ...rest } }) => (
            <Input
              id='email'
              type='text'
              label='e-mail'
              register={register('email')}
              errors={undefined}
              loading={loading}
              placeholder='meuemail@mail.com'
              {...rest}
            />
          )}
        />
      </div>

      <div className='mb-2'>
        <Controller
          control={control}
          name='phone'
          defaultValue={profile?.phoneNumber}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              id='phone'
              type='text'
              label='telefone/celular'
              register={register('phone')}
              errors={undefined}
              loading={loading}
              placeholder='ex: (11) 9 0000-0000'
              {...rest}
            />
          )}
        />
      </div>

      {/* <div className='mb-12'>
        <Controller
          control={control}
          name='cpf'
          render={({ field: { onChange, ...rest } }) => (
            <Input
              id='cpf'
              type='text'
              label='cpf'
              register={register('cpf')}
              errors={undefined}
              loading={loading}
              placeholder='ex: 000.000.000-00'
              {...rest}
            />
          )}
        />
      </div> */}

      <div className='mt-8'>
        {!loading ? (
          <button
            type='submit'
            className='w-full flex text-md font-semibold justify-center uppercase py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-ibeer-900 hover:bg-ibeer-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ibeer-900'
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

      <button
        type='button'
        onClick={signOut}
        className='mt-3 w-full flex text-md font-semibold justify-center items-center gap-x-1 uppercase py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400'
      >
        <ArrowLeftIcon className='w-5 h-5' />
        <span>deslogar</span>
      </button>
    </form>
  );
}
