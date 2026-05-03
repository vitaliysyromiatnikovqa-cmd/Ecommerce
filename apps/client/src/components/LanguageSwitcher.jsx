import { useI18n } from '../lib/i18n';

export function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale, t } = useI18n();
  const classes = className ? `locale-switcher ${className}` : 'locale-switcher';

  return (
    <div className={classes} aria-label={t('language.switcher')} role="group">
      <button
        className={locale === 'uk' ? 'locale-button locale-button-active' : 'locale-button'}
        type="button"
        onClick={() => setLocale('uk')}
      >
        {t('language.uk')}
      </button>
      <button
        className={locale === 'en' ? 'locale-button locale-button-active' : 'locale-button'}
        type="button"
        onClick={() => setLocale('en')}
      >
        {t('language.en')}
      </button>
    </div>
  );
}
