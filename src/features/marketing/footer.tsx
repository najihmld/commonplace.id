import Link from 'next/link';
import Image from 'next/image';
import FooterLocaleSwitcher from '@/features/footer-locale-switcher';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href={'/'} className="mb-4 flex items-center space-x-2">
              <Image
                priority
                alt="commonplace.id"
                src={'/logo-white.svg'}
                height={28}
                width={28}
                className="mx-2"
              />
              <span className="text-xl font-bold">commonplace.id</span>
            </Link>
            <p className="max-w-md text-gray-400">
              Built to grow with you — from note-taking to managing all aspects
              of your productive life.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} commonplace.id. All rights reserved.
          </p>
          <FooterLocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
