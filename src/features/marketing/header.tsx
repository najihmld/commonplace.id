import { Button } from '@/components/common/button';
import Link from 'next/link';
import Logo from '@/components/common/logo';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

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
