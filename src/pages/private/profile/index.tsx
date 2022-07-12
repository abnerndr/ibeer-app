import Avatar from '@/components/Pages/Home/Header/Avatar';
import { ChevronLeftIcon, PhotographIcon } from '@heroicons/react/outline';
import { CameraIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import AvatarIcon from '@/assets/images/avatar.svg';
import { useContext, useState } from 'react';

import ProfileForm from '@/components/Pages/Profile/ProfileForm/ProfileForm';
import { AuthContext } from '@/contexts/AuthContext';

export default function Profile() {
  const { profile }: any = useContext(AuthContext);
  console.log(profile, 'profile');
  const [loading, setLoading] = useState(false);
  const [urlPhoto, setUrlPhoto] = useState('');

  const uploadToLocal = async (e: any) => {
    console.log(e.target.files[0], 'file');
    setUrlPhoto(URL.createObjectURL(e.target.files[0]));
    // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    // if (e.target.files[0]) {
    //   let fd = new FormData();
    //   fd.append('photo', e.target.files[0]);
    //   const { data } = await api.put(`/franchisees`, fd, config);
    // }
    // notify(`imagem`, 'photo alterada com sucesso!', 'success');
  };
  return (
    <div>
      <div className='bg-ibeer-900 w-full h-72'>
        <div className='pt-1'>
          <Link href={'/private/home'}>
            <a>
              <ChevronLeftIcon className='h-10 w-10' />
            </a>
          </Link>
        </div>
        <div>
          {/* profile photo */}
          <div>
            <div className='lg:hidden'>
              <div className='flex justify-center'>
                <Avatar
                  src={urlPhoto || AvatarIcon.src}
                  alt={'avatar'}
                  width={200}
                  height={200}
                  className='object-cover w-[200px] h-[200px] rounded-full'
                />
              </div>
              <div className='flex justify-center -mt-[205px]'>
                <label className='cursor-pointer w-52 rounded-full h-52 bg-black bg-opacity-10 flex items-end justify-end text-md font-medium text-gray-50'>
                  <span className='bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mb-2 mr-4'>
                    <CameraIcon className='h-10 w-10 text-gray-800' />
                  </span>
                  <span className='sr-only'> usar banner</span>
                  <input
                    data-testid='bannermobile'
                    type='file'
                    name='banner'
                    id='banner'
                    title='Sua photo'
                    onChange={uploadToLocal}
                    className='absolute hidden inset-0 w-full h-full bg-black cursor-pointer border-gray-300 rounded-md'
                  />
                </label>
              </div>
            </div>
          </div>
          {/*  form edit */}
          <div className='mt-20 mx-3'>{profile && <ProfileForm loading={loading} />}</div>
        </div>
      </div>
    </div>
  );
}
