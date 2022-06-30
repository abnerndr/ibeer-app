import { toast } from 'react-toastify';
import { Notify } from '@/components/common/Notify/Notify';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import { auth } from '@/services/firebase';
import Header from '@/components/Pages/Home/Header/Header';

export default function Home() {
  const notif = () => {
    Notify({ type: 'google', message: 'teste' });
    Notify({ type: 'github', message: 'teste' });
  };

  const { signOut }: any = useContext(AuthContext);

  const authentication = auth;
  const user = authentication.currentUser;
  console.log(user);

  return (
    <div>
      <Header userName={user?.displayName || user?.email} />
      {/* <div>{user?.email}</div>
      <button onClick={notif}>Notify !</button>
      <button onClick={signOut}>Deslogar</button> */}
    </div>
  );
}
