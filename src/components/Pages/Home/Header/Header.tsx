import Avatar from '@/components/Pages/Home/Header/Avatar';
import AvatarIcon from '@/assets/images/avatar.svg';
import { formatBrl } from '@/helper/utils';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import Link from 'next/link';

interface IHeader {
  avatar?: string;
  userName?: any;
  walletValue?: number;
}

export default function Header({ avatar, userName, walletValue = 0 }: IHeader) {
  return (
    <header className='w-full'>
      <div className='w-full h-20 bg-gray-100'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <div className='pt-1.5 px-2'>
              <Link href='/private/profile'>
                <a>
                  <Avatar src={avatar || AvatarIcon.src} alt={'avatar'} width={70} height={70} />
                </a>
              </Link>
            </div>
            <div className='flex flex-col gap-y-1'>
              <span className='flex items-center gap-x-1'>
                olá, <p className='font-bold text-md'>{userName}</p>
              </span>

              <div className='w-20 h-5 bg-ibeer-900 rounded-3xl flex justify-center items-center text-center font-bold text-sm'>
                <span className=''>{formatBrl(walletValue)}</span>
              </div>
            </div>
          </div>
          <div className=''>
            <button className='pt-4 px-3'>
              <span className='flex h-3 w-3'>
                <span className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-ibeer-900 opacity-75'></span>
                <span className='animate relative inline-flex rounded-full h-3 w-3 bg-ibeer-900'></span>
              </span>
              <ShoppingCartIcon className='h-9 w-9 text-gray-700' />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
