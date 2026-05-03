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
    </AuthShell>
  );
}
