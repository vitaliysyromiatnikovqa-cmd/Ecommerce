import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthField, AuthShell } from '../components/AuthShell';
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
          <Link
            className="auth-inline-link"
            to="/register"
            data-testid="forgot-password-create-account-link"
          >
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
        </div>
      ) : null}
    </AuthShell>
=======
    <div className="auth-layout">
      <section className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">Forgot Password</span>
          <h1>Request a reset token for your GameReason account</h1>
          <p>
            Enter your email and we will generate a password reset token for
            local and API testing.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Email</span>
            <input
              className={errors.email ? 'input-error' : ''}
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              data-testid="forgot-password-email-input"
            />
            {errors.email ? <small className="error-text">{errors.email}</small> : null}
          </label>

          {formError ? <div className="form-error-banner">{formError}</div> : null}

          {result ? (
            <div className="auth-result-panel">
              <p className="auth-result-message">{result.message}</p>

              {result.resetToken ? (
                <label className="field auth-readonly-field">
                  <span>Reset token</span>
                  <input
                    type="text"
                    value={result.resetToken}
                    readOnly
                    aria-readonly="true"
                    className="auth-readonly-input"
                    data-testid="forgot-password-reset-token"
                  />
                </label>
              ) : null}

              {result.expiresAt ? (
                <p className="auth-helper-text auth-result-expiry">
                  Expires at: {new Date(result.expiresAt).toLocaleString()}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="stacked-actions auth-actions-stack">
            <button
              className="primary-button auth-submit auth-submit-wide"
              type="submit"
              disabled={isSubmitting}
              data-testid="forgot-password-submit-button"
            >
              {isSubmitting ? 'Generating token...' : 'Send Reset Link'}
            </button>

            {result?.resetToken ? (
              <Link
                className="secondary-button auth-secondary-action"
                to={`/reset-password?token=${encodeURIComponent(result.resetToken)}`}
                data-testid="forgot-password-open-reset-link"
              >
                Open Reset Password
              </Link>
            ) : null}
          </div>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account? <span>Create Account</span>
        </p>
      </section>

      <aside className="auth-side-note">
        <h2>Rate limited by design</h2>
        <p>
          You can create up to three reset requests within thirty seconds. The
          fourth request is blocked with a rate-limit response.
        </p>
        <Link className="secondary-button" to="/login" data-testid="forgot-password-back-to-sign-in-link">
          Back to Sign In
        </Link>
      </aside>
    </div>
>>>>>>> Stashed changes
  );
}
