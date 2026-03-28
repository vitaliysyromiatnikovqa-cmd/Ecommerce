import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { getSession } from './lib/auth';
import { AccountPage } from './pages/AccountPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

export default function App() {
  const location = useLocation();
  const session = getSession();
  const isAuthRoute = ['/login', '/register', '/forgot-password', '/reset-password'].includes(
    location.pathname,
  );
  const isHomeRoute = location.pathname === '/';
  const showTopbar = !isAuthRoute && !isHomeRoute;
  const navItems = session
    ? [
        { to: '/', label: 'Home' },
        { to: '/account', label: 'Account' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/login', label: 'Login' },
        { to: '/register', label: 'Register' },
      ];

  return (
    <div className="app-shell">
      {showTopbar ? (
        <header className="topbar">
          <NavLink className="brand" to="/">
            GameReason
          </NavLink>

          <nav className="topbar-nav" aria-label="Main navigation">
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
