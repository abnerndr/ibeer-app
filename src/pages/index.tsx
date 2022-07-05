import { useCallback, useContext, useState } from 'react';

import { AuthContext } from '@/contexts/AuthContext';
import FormLogin from '@/components/Pages/Authentication/FormLogin';
import LoginHeader from '@/components/common/AuthBody/LoginHeader';

export default function Login() {
  const [loading, setLoading] = useState(false);

  const { signIn, signInWithGoogle }: any = useContext(AuthContext);

  const onSubmit = useCallback(async (formData: any) => {
    const email = formData.email;
    const password = formData.password;
    await signIn({ email, password });
  }, []);
  return (
    <div className='min-h-full flex flex-col justify-center  sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <LoginHeader />
      </div>

      <FormLogin loading={loading} onSubmit={onSubmit} signInWithGoogle={signInWithGoogle} />
    </div>
  );
}
