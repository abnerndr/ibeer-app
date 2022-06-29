import LoginComponent from '@/components/Pages/Authentication/LoginComponente';
import { useCallback, useContext, useState } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

/* eslint-disable @next/next/no-img-element */
export default function Login() {
  const [loading, setLoading] = useState(false);

  const { signIn }: any = useContext(AuthContext);

  const onSubmit = useCallback(async (formData: any) => {
    const email = formData.email;
    const password = formData.password;
    await signIn({ email, password });
  }, []);
  return (
    <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          className='mx-auto h-12 w-auto'
          src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
          alt='Workflow'
        />
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>acesse a plataforma </h2>
      </div>

      <LoginComponent loading={loading} onSubmit={onSubmit} />
    </div>
  );
}
