/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useCallback, useContext, useState } from 'react';
import LoginFooter from '@/components/common/AuthBody/LoginFooter';
import LoginHeader from '@/components/common/AuthBody/LoginHeader';
import FormCreate from '@/components/Pages/Authentication/FormCreate';
import { AuthContext } from '@/contexts/AuthContext';
import FormNewPassword from '@/components/Pages/Authentication/FormNewPassword';

export default function Index({ create = true }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback((formData: any) => {
    const { password } = formData;
    formData.password = password.replace(/[@]/g, '');
    console.log(formData, 'test');
  }, []);

  return (
    <div className='min-h-full flex flex-col justify-center sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <LoginHeader />
      </div>

      <FormNewPassword loading={loading} onSubmit={onSubmit} />
    </div>
  );
}
