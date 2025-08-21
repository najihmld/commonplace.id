import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <Link href={'/'} className="flex items-center space-x-2">
      <Image
        priority
        alt="commonplace.id"
        src={'/logo.svg'}
        height={28}
        width={28}
        className="mx-2"
      />
      <span className="flex flex-row items-center text-lg font-bold text-gray-900 lg:text-xl">
        commonplace.id
        <span className="ml-1.5 text-[8px] font-semibold text-orange-600 xl:text-[10px]">
          BETA
        </span>
      </span>
    </Link>
  );
}

export default Logo;
