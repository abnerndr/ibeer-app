import LoginComponent from '@/components/Pages/Authentication/LoginComponente';
import { useCallback, useState } from 'react';

/* eslint-disable @next/next/no-img-element */
export default function Create() {
  const [loading, setLoading] = useState(false);
  const [create, setCreate] = useState(false);

  //   const getUrl = window.location.pathname;
  //   if (getUrl === '/public/authentication/Create') {
  //     setCreate(true);
  //   } else {
  //     setCreate(false);
  //   }

  const onSubmit = useCallback(async (formData: any) => {
    console.log(formData);
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

      <LoginComponent create={create} loading={loading} onSubmit={onSubmit} />
    </div>
  );
}
