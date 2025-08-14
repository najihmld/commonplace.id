import Footer from '@/features/marketing/footer';
import Header from '@/features/marketing/header';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '/privacy-policy' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function PrivacyPolicyPage() {
  const t = useTranslations('/privacy-policy');
  const sections = t.raw('sections') as {
    title: string;
    desc: string;
    list?: string[];
  }[];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="prose mx-auto max-w-3xl flex-1 px-6">
        <section className="relative z-20 py-10 xl:py-20">
          <h1 className="tracking-tight text-black lg:leading-tight dark:text-white">
            {t('title')}
          </h1>

          <div className="mx-auto font-normal text-neutral-500 dark:text-neutral-300">
            {t('last-updated')}
          </div>

          <div>
            <p>
              {t.rich('intro.p1', {
                strong: (chunk) => <strong>{chunk}</strong>,
              })}
            </p>
            <p>{t('intro.p2')}</p>
          </div>

          <ol>
            {sections.map((section, idx) => (
              <li key={idx}>
                <h3 className="text-neutral-800 dark:text-white">
                  {section.title}
                </h3>
                <p>{section.desc}</p>

                {section.list && (
                  <ul className="mt-2 list-disc pl-6">
                    {section.list.map((_, i) => (
                      <li key={i}>
                        {t.rich(`sections.${idx}.list.${i}`, {
                          strong: (chunk) => <strong>{chunk}</strong>,
                        })}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>
      </main>

      <Footer />
    </div>
  );
}
