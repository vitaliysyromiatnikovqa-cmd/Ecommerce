import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthField, AuthShell } from '../components/AuthShell';
import { forgotPassword } from '../lib/api';
import { validateForgotPasswordForm } from '../lib/validation';

export function ForgotPasswordPage() {
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

    const nextErrors = validateForgotPasswordForm(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await forgotPassword(values);
      setResult(response);
    } catch (error) {
      setErrors(error.fieldErrors || {});
      setFormError(error.message);
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
          <Link className="auth-inline-link" to="/register" data-testid="forgot-password-create-account-link">
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
            Open Reset Password
          </Link>
        </div>
      ) : null}
    </AuthShell>
  );
}
