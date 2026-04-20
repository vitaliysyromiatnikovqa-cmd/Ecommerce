import { useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< Updated upstream
import { AuthField, AuthShell } from '../components/AuthShell';
=======
import { LanguageSwitcher } from '../components/LanguageSwitcher';
>>>>>>> Stashed changes
import { forgotPassword } from '../lib/api';
import { localizeApiError, translateKnownMessage, useI18n } from '../lib/i18n';
import { validateForgotPasswordForm } from '../lib/validation';

export function ForgotPasswordPage() {
  const { t } = useI18n();
  const [values, setValues] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
    setResult(null);
    setErrors((current) => ({
      ...current,
      [name]: '',
    }));
    setFormError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForgotPasswordForm(values, t);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await forgotPassword(values);
      setResult({
        ...response,
        message: translateKnownMessage(response.message, t),
      });
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
      backTo="/login"
      backLabel="Back to Login"
      title="Forgot Password?"
      subtitle="No worries! Enter your email and we'll send you reset instructions."
      footer={
        <p className="auth-helper-text auth-helper-text-centered">
          Don&apos;t have an account?{' '}
          <Link className="auth-inline-link" to="/register" data-testid="forgot-password-create-account-link">
            Create Account
          </Link>
=======
    <div className="auth-layout">
      <section className="auth-card">
        <div className="auth-toolbar">
          <LanguageSwitcher className="page-locale-switcher" />
        </div>

        <div className="auth-copy">
          <span className="eyebrow">{t('forgotPassword.eyebrow')}</span>
          <h1>{t('forgotPassword.title')}</h1>
          <p>{t('forgotPassword.description')}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>{t('common.email')}</span>
            <input
              className={errors.email ? 'input-error' : ''}
              type="email"
              name="email"
              placeholder={t('register.emailPlaceholder')}
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <small className="error-text">{errors.email}</small> : null}
          </label>

          {formError ? <div className="form-error-banner">{formError}</div> : null}

          {result ? (
            <div className="status-banner">
              <div>{result.message}</div>
              {result.resetToken ? (
                <div>
                  {t('forgotPassword.tokenLabel')}: <strong>{result.resetToken}</strong>
                </div>
              ) : null}
              {result.expiresAt ? (
                <div>
                  {t('forgotPassword.expiresAt')}: {result.expiresAt}
                </div>
              ) : null}
            </div>
          ) : null}

          <button className="primary-button auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('forgotPassword.submitting') : t('forgotPassword.submit')}
          </button>
        </form>

        <p className="auth-footer">
          {t('forgotPassword.footerLead')} <span>{t('forgotPassword.footerAccent')}</span>
>>>>>>> Stashed changes
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
          testId="forgot-password-email-input"
        />

        {formError ? <div className="form-error-banner">{formError}</div> : null}

        {result ? (
          <div className="status-banner auth-result-card">
            <div>{result.message}</div>
            {result.resetToken ? (
              <div className="auth-token-row">
                <span>Reset token</span>
                <strong>{result.resetToken}</strong>
              </div>
            ) : null}
            {result.expiresAt ? <div className="auth-helper-text">Expires at: {result.expiresAt}</div> : null}
          </div>
        ) : null}

        <button
          className="primary-button auth-submit auth-submit-wide"
          type="submit"
          disabled={isSubmitting}
          data-testid="forgot-password-submit-button"
        >
          {isSubmitting ? 'Sending reset link...' : 'Send Reset Link'}
        </button>
      </form>

      {result?.resetToken ? (
        <div className="stacked-actions">
          <Link
            className="secondary-button auth-submit-wide"
            to={`/reset-password?token=${encodeURIComponent(result.resetToken)}`}
            data-testid="forgot-password-open-reset-link"
          >
            {t('forgotPassword.openReset')}
          </Link>
<<<<<<< Updated upstream
        </div>
      ) : null}
    </AuthShell>
=======
        ) : null}
      </section>

      <aside className="auth-side-note">
        <h2>{t('forgotPassword.sideTitle')}</h2>
        <p>{t('forgotPassword.sideDescription')}</p>
        <Link className="secondary-button" to="/login">
          {t('forgotPassword.sideCta')}
        </Link>
      </aside>
    </div>
>>>>>>> Stashed changes
  );
}
