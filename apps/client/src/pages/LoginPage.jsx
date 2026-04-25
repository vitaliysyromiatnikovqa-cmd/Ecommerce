import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthField, AuthShell } from '../components/AuthShell';
import { loginUser } from '../lib/api';
import { saveSession } from '../lib/auth';
<<<<<<< Updated upstream
import { localizeApiError, useI18n } from '../lib/i18n';
=======
import { useI18n } from '../lib/i18n';
>>>>>>> Stashed changes
import { validateLoginForm } from '../lib/validation';

export function LoginPage() {
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const { t } = useI18n();
=======
  const { t, translateText } = useI18n();
>>>>>>> Stashed changes
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
    setErrors((current) => ({
      ...current,
      [name]: '',
    }));
    setFormError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

<<<<<<< Updated upstream
    const nextErrors = validateLoginForm(values, t);
=======
    const nextErrors = validateLoginForm(values, translateText);
>>>>>>> Stashed changes

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await loginUser(values);
      saveSession({
        accessToken: response.accessToken,
        user: response.user,
      });
      navigate('/account');
    } catch (error) {
      const localizedError = localizeApiError(error, t);
      setErrors(localizedError.fieldErrors || {});
      setFormError(localizedError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
<<<<<<< Updated upstream
    <AuthShell
      shellBackTo="/"
      shellBackLabel="Back to Home"
      title="Welcome Back"
      subtitle="Sign in to your GameReason account"
      footer={
        <p className="auth-helper-text auth-helper-text-centered">
          Don&apos;t have an account?{' '}
          <Link className="auth-inline-link" to="/register" data-testid="login-create-account-link">
            Create Account
          </Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthField
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          icon="mail"
          testId="login-email-input"
        />

        <AuthField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          icon="password"
          toggleVisibility
          testId="login-password-input"
          toggleTestId="login-password-toggle"
        />

        <div className="auth-meta-row">
          <label className="auth-check">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              data-testid="login-remember-me-checkbox"
            />
            <span>Remember me</span>
          </label>

          <Link className="auth-inline-link" to="/forgot-password" data-testid="login-forgot-password-link">
            Forgot Password?
          </Link>
        </div>

        {formError ? <div className="form-error-banner">{formError}</div> : null}

        <button
          className="primary-button auth-submit auth-submit-wide"
          type="submit"
          disabled={isSubmitting}
          data-testid="login-submit-button"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </AuthShell>
=======
    <div className="auth-layout">
      <section className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">{t('login.eyebrow')}</span>
          <h1>{t('login.title')}</h1>
          <p>{t('login.description')}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>{t('common.email')}</span>
            <input
              className={errors.email ? 'input-error' : ''}
              type="email"
              name="email"
              placeholder={t('login.emailPlaceholder')}
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <small className="error-text">{errors.email}</small> : null}
          </label>

          <label className="field">
            <span>{t('common.password')}</span>
            <input
              className={errors.password ? 'input-error' : ''}
              type="password"
              name="password"
              placeholder={t('login.passwordPlaceholder')}
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password ? (
              <small className="error-text">{errors.password}</small>
            ) : null}
          </label>

          {formError ? <div className="form-error-banner">{formError}</div> : null}

          <button className="primary-button auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('login.submitting') : t('common.signIn')}
          </button>
        </form>

        <p className="auth-footer">
          {t('login.noAccount')} <span>{t('login.noAccountHighlight')}</span>
        </p>

        <p className="auth-footer">
          {t('login.forgotCopy')} <span>{t('login.forgotHighlight')}</span>
        </p>
        <Link className="secondary-button" to="/forgot-password">
          {t('common.forgotPassword')}
        </Link>
      </section>

      <aside className="auth-side-note">
        <h2>{t('login.sideTitle')}</h2>
        <p>{t('login.sideDescription')}</p>
        <Link className="secondary-button" to="/register">
          {t('common.createAccount')}
        </Link>
      </aside>
    </div>
>>>>>>> Stashed changes
  );
}
