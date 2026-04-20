import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import { AuthField, AuthShell } from '../components/AuthShell';
=======
import { LanguageSwitcher } from '../components/LanguageSwitcher';
>>>>>>> Stashed changes
import { registerUser } from '../lib/api';
import { saveSession } from '../lib/auth';
import { localizeApiError, useI18n } from '../lib/i18n';
import { validateRegisterForm } from '../lib/validation';

function PasswordRulesTooltip() {
  return (
    <span className="password-rules-tooltip">
      <button
        className="password-rules-trigger"
        type="button"
        aria-label="View password rules"
        data-testid="register-password-rules-trigger"
      >
        ?
      </button>
      <span
        className="password-rules-popover"
        role="tooltip"
        data-testid="register-password-rules-tooltip"
      >
        <strong>Password rules</strong>
        <span>At least 8 characters</span>
        <span>At least 1 uppercase English letter</span>
        <span>At least 1 digit</span>
        <span>At least 1 special character</span>
        <span>English letters, digits, and special characters only</span>
      </span>
    </span>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const nextErrors = validateRegisterForm(values, t);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await registerUser(values);
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
      title="Create Account"
      subtitle="Set up your GameReason profile to start building your library."
      footer={
        <p className="auth-helper-text auth-helper-text-centered">
          Already have an account?{' '}
          <Link className="auth-inline-link" to="/login" data-testid="register-sign-in-link">
            Sign In
          </Link>
=======
    <div className="auth-layout">
      <section className="auth-card">
        <div className="auth-toolbar">
          <LanguageSwitcher className="page-locale-switcher" />
        </div>

        <div className="auth-copy">
          <span className="eyebrow">{t('register.eyebrow')}</span>
          <h1>{t('register.title')}</h1>
          <p>{t('register.description')}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <label className="field">
            <span>{t('common.password')}</span>
            <input
              className={errors.password ? 'input-error' : ''}
              type="password"
              name="password"
              placeholder={t('register.passwordPlaceholder')}
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password ? (
              <small className="error-text">{errors.password}</small>
            ) : null}
          </label>

          <label className="field">
            <span>{t('common.confirmPassword')}</span>
            <input
              className={errors.confirmPassword ? 'input-error' : ''}
              type="password"
              name="confirmPassword"
              placeholder={t('register.confirmPasswordPlaceholder')}
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={handleChange}
              aria-invalid={Boolean(errors.confirmPassword)}
            />
            {errors.confirmPassword ? (
              <small className="error-text">{errors.confirmPassword}</small>
            ) : null}
          </label>

          {formError ? <div className="form-error-banner">{formError}</div> : null}

          <button className="primary-button auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('register.submitting') : t('register.submit')}
          </button>
        </form>

        <p className="auth-footer">
          {t('register.footerLead')} <span>{t('register.footerAccent')}</span>
>>>>>>> Stashed changes
        </p>
      }
      panelClassName="auth-panel-wide"
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
          testId="register-email-input"
        />

<<<<<<< Updated upstream
        <AuthField
          label="Password"
          labelAdornment={<PasswordRulesTooltip />}
          name="password"
          type="password"
          placeholder="Create your password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          icon="password"
          toggleVisibility
          testId="register-password-input"
          toggleTestId="register-password-toggle"
        />

        <AuthField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Repeat your password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon="password"
          toggleVisibility
          testId="register-confirm-password-input"
          toggleTestId="register-confirm-password-toggle"
        />

        {formError ? <div className="form-error-banner">{formError}</div> : null}

        <button
          className="primary-button auth-submit auth-submit-wide"
          type="submit"
          disabled={isSubmitting}
          data-testid="register-submit-button"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </AuthShell>
=======
      <aside className="auth-side-note">
        <h2>{t('register.sideTitle')}</h2>
        <p>{t('register.sideDescription')}</p>
        <Link className="secondary-button" to="/login">
          {t('register.sideCta')}
        </Link>
      </aside>
    </div>
>>>>>>> Stashed changes
  );
}
