import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
    <div className="auth-layout">
      <section className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">Reset Password</span>
          <h1>Set a new password and jump back into GameReason</h1>
          <p>
            Paste the reset token, choose a new password, and the platform will
            sign you in automatically after a successful reset.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Reset Token</span>
            <input
              className={errors.token ? 'input-error' : ''}
              type="text"
              name="token"
              placeholder="Paste your reset token"
              value={values.token}
              onChange={handleChange}
              aria-invalid={Boolean(errors.token)}
            />
            {errors.token ? <small className="error-text">{errors.token}</small> : null}
          </label>

          <label className="field">
            <span>New Password</span>
            <input
              className={errors.password ? 'input-error' : ''}
              type="password"
              name="password"
              placeholder="Create your new password"
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password ? <small className="error-text">{errors.password}</small> : null}
          </label>

          <label className="field">
            <span>Confirm New Password</span>
            <input
              className={errors.confirmPassword ? 'input-error' : ''}
              type="password"
              name="confirmPassword"
              placeholder="Repeat your new password"
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
            {isSubmitting ? 'Resetting password...' : 'Reset Password'}
          </button>
        </form>

        <p className="auth-footer">
          Need a new token? <span>Generate another one from the forgot password page.</span>
        </p>
        <Link className="secondary-button" to="/forgot-password">
          Request Another Token
        </Link>
      </section>

      <aside className="auth-side-note">
        <h2>Old tokens are invalidated</h2>
        <p>
          Every new forgot-password request invalidates previous active reset
          tokens, so only the latest valid token can be used.
        </p>
        <Link className="secondary-button" to="/login">
          Back to Sign In
        </Link>
      </aside>
    </div>
  );
}
