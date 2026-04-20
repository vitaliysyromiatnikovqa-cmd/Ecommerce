import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { getSession } from './lib/auth';
import { useI18n } from './lib/i18n';
import { LanguageSwitcher } from './components/LanguageSwitcher';
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
  const { t } = useI18n();
  const isAuthRoute = ['/login', '/register', '/forgot-password', '/reset-password'].includes(
    location.pathname,
  );
  const isHomeRoute = location.pathname === '/';
  const showTopbar = !isAuthRoute && !isHomeRoute;
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
