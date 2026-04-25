import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { getSession } from './lib/auth';
import { useI18n } from './lib/i18n';
<<<<<<< Updated upstream
import { LanguageSwitcher } from './components/LanguageSwitcher';
=======
>>>>>>> Stashed changes
import { AccountPage } from './pages/AccountPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

function toTestIdPart(value) {
  return value === '/' ? 'home' : value.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

export default function App() {
  const location = useLocation();
  const session = getSession();
<<<<<<< Updated upstream
  const { t } = useI18n();
  const isAuthRoute = ['/login', '/register', '/forgot-password', '/reset-password'].includes(
    location.pathname,
  );
  const isHomeRoute = location.pathname === '/';
  const isAccountRoute = location.pathname === '/account';
  const showTopbar = !isAuthRoute && !isHomeRoute && !isAccountRoute;
=======
  const { locale, setLocale, t } = useI18n();
>>>>>>> Stashed changes
  const navItems = session
    ? [
        { to: '/', label: t('nav.home') },
        { to: '/account', label: t('nav.account') },
      ]
    : [
        { to: '/', label: t('nav.home') },
        { to: '/login', label: t('nav.login') },
        { to: '/register', label: t('nav.register') },
      ];

  return (
    <div className="app-shell">
<<<<<<< Updated upstream
      {showTopbar ? (
        <header className="topbar">
          <NavLink className="brand" to="/" data-testid="topbar-brand-link">
            {t('common.brand')}
          </NavLink>

          <div className="topbar-actions">
            <nav className="topbar-nav" aria-label={t('nav.mainNavigation')}>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  className={({ isActive }) =>
                    isActive ? 'topbar-link topbar-link-active' : 'topbar-link'
                  }
                  to={item.to}
                  data-testid={`topbar-nav-${toTestIdPart(item.to)}-link`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
=======
      <header className="topbar">
        <NavLink className="brand" to="/">
          {t('app.name')}
        </NavLink>

        <div className="topbar-actions">
          <nav className="topbar-nav" aria-label={t('app.mainNavigation')}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  isActive ? 'topbar-link topbar-link-active' : 'topbar-link'
                }
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="language-switcher" aria-label="Language switcher">
            <button
              className={locale === 'uk' ? 'locale-button locale-button-active' : 'locale-button'}
              type="button"
              onClick={() => setLocale('uk')}
            >
              {t('locale.ukrainian')}
            </button>
            <button
              className={locale === 'en' ? 'locale-button locale-button-active' : 'locale-button'}
              type="button"
              onClick={() => setLocale('en')}
            >
              {t('locale.english')}
            </button>
          </div>
        </div>
      </header>
>>>>>>> Stashed changes

            <LanguageSwitcher />
          </div>
        </header>
      ) : null}

      <main
        className={
          isAuthRoute
            ? 'page-content auth-page-content'
            : isHomeRoute
              ? 'page-content home-page-content'
              : 'page-content'
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </main>
    </div>
  );
}
