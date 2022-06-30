/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';

type NImage = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
};

export default function NextImage({ src, alt, width, height, ...props }: NImage) {
  return <Image {...props} src={src} alt={alt} width={width} height={height} />;
}
