import Avatar from '@/components/Pages/Home/Header/Avatar';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { CameraIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import AvatarIcon from '@/assets/images/avatar.svg';
import { useContext, useEffect, useState } from 'react';

import ProfileForm from '@/components/Pages/Profile/ProfileForm/ProfileForm';
import { AuthContext } from '@/contexts/AuthContext';

import { auth, storange } from '@/services/firebase';
import { ref, uploadBytes, getDownloadURL, getBlob } from 'firebase/storage';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<any>(null);
  const [url, setUrl] = useState<any>(null);
  const [image, setImage] = useState<any>(null);

  const { profile, updatedProfile, signOut }: any = useContext(AuthContext);

  const uploadToLocal = async (e: any) => {
    setUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    const mountainsRef = ref(storange, image?.name);

    uploadBytes(mountainsRef, image).then((snapshot) => {
      getDownloadURL(mountainsRef).then((url) => {
        setPhotoUrl(url);
      });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const photoURL = photoUrl;
      if (photoUrl) {
        await updatedProfile({ photoURL, setLoading });
      }
    };
    fetchData().catch();
  }, [uploadToLocal]);

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
        {profile?.photoURL && profile && (
          <div>
            {/* profile photo */}
            <div>
              <div className='lg:hidden'>
                <div className='flex justify-center'>
                  <Avatar
                    src={url || profile?.photoURL || AvatarIcon.src}
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
            <div className='mt-14 mx-3'>
              <ProfileForm loading={loading} setLoading={setLoading} urlPicture={photoUrl} signOut={signOut} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
