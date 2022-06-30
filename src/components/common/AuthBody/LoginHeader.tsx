import NextImage from '@/components/common/Global/NextImage';
import Banner from '@/assets/images/espulma.svg';
import ILogo from '@/assets/images/Ilogo.svg';

export default function LoginHeader() {
  return (
    <>
      <NextImage src={Banner.src} alt='banner espulma' width={1200} height={500} />
      <div className='flex justify-center pl-12'>
        <NextImage src={ILogo.src} alt='banner espulma' width={300} height={100} />
      </div>
    </>
  );
}
