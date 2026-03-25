import { useState } from 'react';
import { Link } from 'react-router-dom';
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
            />
            {errors.email ? <small className="error-text">{errors.email}</small> : null}
          </label>

          {formError ? <div className="form-error-banner">{formError}</div> : null}

          {result ? (
            <div className="status-banner">
              <div>{result.message}</div>
              {result.resetToken ? (
                <div>
                  Reset token: <strong>{result.resetToken}</strong>
                </div>
              ) : null}
              {result.expiresAt ? <div>Expires at: {result.expiresAt}</div> : null}
            </div>
          ) : null}

          <button className="primary-button auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Generating token...' : 'Generate Reset Token'}
          </button>
        </form>

        <p className="auth-footer">
          Already know your token? <span>Go straight to password reset.</span>
        </p>
        {result?.resetToken ? (
          <Link
            className="secondary-button"
            to={`/reset-password?token=${encodeURIComponent(result.resetToken)}`}
          >
            Open Reset Password
          </Link>
        ) : null}
      </section>

      <aside className="auth-side-note">
        <h2>Rate limited by design</h2>
        <p>
          You can create up to three reset requests within thirty seconds. The
          fourth request is blocked with a rate-limit response.
        </p>
        <Link className="secondary-button" to="/login">
          Back to Sign In
        </Link>
      </aside>
    </div>
  );
}
