import { toast } from 'react-toastify';
import { Notify } from '@/components/common/Notify/Notify';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import { auth } from '@/services/firebase';

export default function Home() {
  const notif = () => {
    Notify({ type: 'google', message: 'teste' });
    Notify({ type: 'github', message: 'teste' });
  };

  const authentication = auth;
  const user = authentication.currentUser;

  return (
    <div>
      <div>{user?.email}</div>
      <button onClick={notif}>Notify !</button>
    </div>
  );
}
