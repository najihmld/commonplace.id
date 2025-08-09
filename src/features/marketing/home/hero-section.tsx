'use client';

import { Badge } from '@/components/common/badge';
import { Button } from '@/components/common/button';
import { TextGenerateEffect } from '@/components/common/text-generate-effect';
import { cn } from '@/lib/utils';
import { ArrowRight, Shield, Star, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations(`/`);

  return (
    <section>
      <div className="relative flex min-h-[calc(100vh-65px)] w-full items-center justify-center bg-white dark:bg-black">
        <div
          className={cn(
            'absolute inset-0 opacity-50',
            '[background-size:40px_40px]',
            '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
            'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        <div
          className={
            'z-10 flex w-full flex-col items-center justify-center px-4'
          }
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <motion.span
                initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 * 0,
                  ease: 'easeInOut',
                }}
                className="mr-2 inline-block"
              >
                <Badge variant="secondary" className="mb-4">
                  <Zap className="mr-1 h-3 w-3" />
                  Powered by the PARA Method
                </Badge>
              </motion.span>

              <h1 className="text-4xl leading-tight font-bold tracking-tight text-gray-900 lg:text-7xl">
                <motion.span
                  initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 * 1,
                    ease: 'easeInOut',
                  }}
                  className="mr-2 inline-block"
                >
                  Your Digital
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 * 2,
                    ease: 'easeInOut',
                  }}
                  className="mr-2 inline-block"
                >
                  <span className="block lg:inline">
                    <span className="outlined-text font-sans">
                      &nbsp;Second Brain
                    </span>
                  </span>
                </motion.span>
              </h1>

              <motion.span
                initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 * 3,
                  ease: 'easeInOut',
                }}
              >
                <div>
                  <TextGenerateEffect
                    duration={0.1}
                    className="mt-6 text-base leading-8 text-neutral-600 lg:text-lg dark:text-neutral-400"
                    words={t('hero.desc')}
                  />
                </div>
              </motion.span>

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0,
                }}
              >
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="w-full sm:w-auto">
                    {t('hero.start-taking-notes')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {t('hero.watch-demo')}
                  </Button>
                </div>

                <div className="mt-12 flex items-center justify-center space-x-3 text-xs text-gray-500 lg:space-x-8 lg:text-sm">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    10,000+ {t('hero.users')}
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    4.9/5 {t('hero.rating')}
                  </div>
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    {t('hero.privacy-first')}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
