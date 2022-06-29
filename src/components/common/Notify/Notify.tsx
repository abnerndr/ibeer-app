import { toast } from 'react-toastify';
import { OptionsProps, NotifyProps } from '@/components/common/Notify/types';
import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si';

const option: OptionsProps = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

export const Notify = ({ type, message }: NotifyProps) => {
  switch (type) {
    case 'success':
      toast.success(message, option);
      break;
    case 'warn':
      toast.warn(message, option);
      break;
    case 'error':
      toast.error(message, option);
      break;
    case 'info':
      toast.info(message, option);
      break;
    case 'google':
      toast.dark(message, {
        icon: ({ theme, type }) => <FcGoogle />
      });
      break;
    case 'github':
      toast.dark(message, {
        icon: ({ theme, type }) => <SiGithub />
      });
      break;
  }
};
