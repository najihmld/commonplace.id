import { useTranslations } from 'next-intl';

export default function ProjectsPage() {
  const t = useTranslations('ProjectsPage');
  return (
    <>
      <h1 className="text-text-primary text-2xl font-bold tracking-tight">
        {t('title')}
      </h1>
      <h2 className="text-text-secondary">{t('description')}</h2>
    </>
  );
}
