import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthField, AuthShell } from '../components/AuthShell';
import { resetPassword } from '../lib/api';
import { saveSession } from '../lib/auth';
<<<<<<< Updated upstream
import { localizeApiError, useI18n } from '../lib/i18n';
=======
import { useI18n } from '../lib/i18n';
>>>>>>> Stashed changes
import { validateResetPasswordForm } from '../lib/validation';

export function ResetPasswordPage() {
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const { t } = useI18n();
=======
  const { t, translateText } = useI18n();
>>>>>>> Stashed changes
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState({
    token: searchParams.get('token') ?? '',
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

<<<<<<< Updated upstream
    const nextErrors = validateResetPasswordForm(values, t);
=======
    const nextErrors = validateResetPasswordForm(values, translateText);
>>>>>>> Stashed changes

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await resetPassword(values);
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
      backTo="/forgot-password"
      backLabel="Back to Forgot Password"
      title="Reset Password"
      subtitle="Paste your reset token and set a fresh password to jump back into GameReason."
      footer={
        <p className="auth-helper-text auth-helper-text-centered">
          Need a new token?{' '}
          <Link
            className="auth-inline-link"
            to="/forgot-password"
            data-testid="reset-password-request-token-link"
          >
            Request Another Token
          </Link>
        </p>
      }
      panelClassName="auth-panel-wide"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthField
          label="Reset Token"
          name="token"
          type="text"
          placeholder="Paste your reset token"
          value={values.token}
          onChange={handleChange}
          error={errors.token}
          icon="token"
          testId="reset-password-token-input"
        />

        <AuthField
          label="New Password"
          name="password"
          type="password"
          placeholder="Create your new password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          icon="password"
          toggleVisibility
          testId="reset-password-password-input"
          toggleTestId="reset-password-password-toggle"
        />

        <AuthField
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          placeholder="Repeat your new password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon="password"
          toggleVisibility
          testId="reset-password-confirm-password-input"
          toggleTestId="reset-password-confirm-password-toggle"
        />

        <p className="auth-helper-text">
          Password must include at least 8 characters, one uppercase letter, one digit, and one special symbol.
        </p>

        {formError ? <div className="form-error-banner">{formError}</div> : null}

        <button
          className="primary-button auth-submit auth-submit-wide"
          type="submit"
          disabled={isSubmitting}
          data-testid="reset-password-submit-button"
        >
          {isSubmitting ? 'Resetting password...' : 'Reset Password'}
        </button>
      </form>
    </AuthShell>
=======
    <div className="auth-layout">
      <section className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">{t('resetPassword.eyebrow')}</span>
          <h1>{t('resetPassword.title')}</h1>
          <p>{t('resetPassword.description')}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>{t('resetPassword.token')}</span>
            <input
              className={errors.token ? 'input-error' : ''}
              type="text"
              name="token"
              placeholder={t('resetPassword.tokenPlaceholder')}
              value={values.token}
              onChange={handleChange}
              aria-invalid={Boolean(errors.token)}
            />
            {errors.token ? <small className="error-text">{errors.token}</small> : null}
          </label>

          <label className="field">
            <span>{t('resetPassword.newPassword')}</span>
            <input
              className={errors.password ? 'input-error' : ''}
              type="password"
              name="password"
              placeholder={t('resetPassword.newPasswordPlaceholder')}
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password ? <small className="error-text">{errors.password}</small> : null}
          </label>

          <label className="field">
            <span>{t('resetPassword.confirmNewPassword')}</span>
            <input
              className={errors.confirmPassword ? 'input-error' : ''}
              type="password"
              name="confirmPassword"
              placeholder={t('resetPassword.confirmNewPasswordPlaceholder')}
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
            {isSubmitting ? t('resetPassword.submitting') : t('resetPassword.submit')}
          </button>
        </form>

        <p className="auth-footer">
          {t('resetPassword.needToken')} <span>{t('resetPassword.needTokenHighlight')}</span>
        </p>
        <Link className="secondary-button" to="/forgot-password">
          {t('resetPassword.requestAnother')}
        </Link>
      </section>

      <aside className="auth-side-note">
        <h2>{t('resetPassword.sideTitle')}</h2>
        <p>{t('resetPassword.sideDescription')}</p>
        <Link className="secondary-button" to="/login">
          {t('common.backToSignIn')}
        </Link>
      </aside>
    </div>
>>>>>>> Stashed changes
  );
}
