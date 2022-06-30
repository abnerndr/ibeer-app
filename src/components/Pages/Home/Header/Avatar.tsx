import Image from 'next/image';

type NImage = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
};

export default function NextImage({ src, alt, width, height, ...props }: NImage) {
  return (
    <div>
      <img
        {...props}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className=' rounded-full border-2 border-orange-300'
      />
    </div>
  );
}
