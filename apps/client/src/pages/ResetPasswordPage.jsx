import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthField, AuthShell } from '../components/AuthShell';
import { resetPassword } from '../lib/api';
import { saveSession } from '../lib/auth';
import { validateResetPasswordForm } from '../lib/validation';

export function ResetPasswordPage() {
  const navigate = useNavigate();
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

    const nextErrors = validateResetPasswordForm(values);

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
      setErrors(error.fieldErrors || {});
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      backTo="/forgot-password"
      backLabel="Back to Forgot Password"
      title="Reset Password"
      subtitle="Paste your reset token and set a fresh password to jump back into GameReason."
      footer={
        <p className="auth-helper-text auth-helper-text-centered">
          Need a new token?{' '}
          <Link className="auth-inline-link" to="/forgot-password" data-testid="reset-password-request-token-link">
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
  );
}
