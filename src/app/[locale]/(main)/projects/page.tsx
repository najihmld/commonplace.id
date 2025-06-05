import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ProjectsPage() {
  const t = useTranslations('projects');
  return (
    <div>
      <h1>{t('title')}</h1>
      <h2>{t('description', { name: 'cobain' })}</h2>
      <Link href="/areas">Areas</Link>
    </div>
  );
}
