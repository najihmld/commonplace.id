import { Button } from '@/components/common/button';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSection } from '@/features/marketing/home/hero-section';
import { FeaturesSection } from '@/features/marketing/home/features-section';
import { AboutParaSection } from '@/features/marketing/home/about-para-section';
import { CoomingSoonSection } from '@/features/marketing/home/coming-soon-section';

export default async function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
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
            </div>

            <Button asChild size="sm" className="flex items-center gap-2">
              <Link href="/auth" className="dark:text-white">
                Log In
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AboutParaSection />
        <CoomingSoonSection />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-4 flex items-center space-x-2">
                <Image
                  priority
                  alt="commonplace.id"
                  src={'/logo-white.svg'}
                  height={28}
                  width={28}
                  className="mx-2"
                />
                <span className="text-xl font-bold">commonplace.id</span>
              </div>
              <p className="max-w-md text-gray-400">
                Built to grow with you — from note-taking to managing all
                aspects of your productive life.
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
                  <Link href="#" className="transition-colors hover:text-white">
                    Privacy
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
            <div className="mt-4 flex space-x-4 sm:mt-0">
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                GitHub
              </Link>
              <Link
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Discord
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
