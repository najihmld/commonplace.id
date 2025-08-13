import { Button } from '@/components/common/button';
import Link from 'next/link';
import Image from 'next/image';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
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

          <Button asChild size="sm" className="flex items-center gap-2">
            <Link href="/auth" className="dark:text-white">
              Log In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
