import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthField, AuthShell } from '../components/AuthShell';
import { registerUser } from '../lib/api';
import { saveSession } from '../lib/auth';
import { validateRegisterForm } from '../lib/validation';

export function RegisterPage() {
  const navigate = useNavigate();
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

    const nextErrors = validateRegisterForm(values);

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
      setErrors(error.fieldErrors || {});
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Create Account"
      subtitle="Set up your GameReason profile to start building your library."
      footer={
        <p className="auth-helper-text auth-helper-text-centered">
          Already have an account?{' '}
          <Link className="auth-inline-link" to="/login">
            Sign In
          </Link>
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
        />

        <AuthField
          label="Password"
          name="password"
          type="password"
          placeholder="Create your password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          icon="password"
          toggleVisibility
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
        />

        {formError ? <div className="form-error-banner">{formError}</div> : null}

        <button className="primary-button auth-submit auth-submit-wide" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </AuthShell>
  );
}
