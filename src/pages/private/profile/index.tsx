import Avatar from '@/components/Pages/Home/Header/Avatar';
import { ChevronLeftIcon, PhotographIcon } from '@heroicons/react/outline';
import { CameraIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import AvatarIcon from '@/assets/images/avatar.svg';

export default function Profile() {
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
            {/* <div className='flex justify-center'>
              <Avatar src={AvatarIcon.src} alt={'avatar'} width={200} height={200} />
            </div>
            <div className='flex absolute bg-gray-90 w-32 h-32'>
              <input type='file' name='' id='' />
              <CameraIcon className='h-14 w-14' />
            </div> */}
            <div className='mt-6 lg:hidden'>
              <div className='flex items-center'>
                <div className='flex-shrink-0 inline-block overflow-hidden h-12 w-12' aria-hidden='true'>
                  <Avatar src={AvatarIcon.src} alt={'avatar'} width={200} height={200} />
                </div>
                <div className='ml-5 shadow-sm'>
                  <div className='group relative border border-gray-300 py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500'>
                    <label
                      htmlFor='mobile-user-photo'
                      className='relative text-sm leading-4 font-medium text-gray-700 pointer-events-none'
                    ></label>
                    <input
                      data-testid='banner'
                      type='file'
                      name='photo'
                      id='mobile-user-photo'
                      title='Sua photo'
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span>profile</span>
    </div>
  );
}
