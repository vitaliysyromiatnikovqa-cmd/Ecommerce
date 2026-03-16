import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
      saveSession(response.user);
      navigate('/');
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
          <span className="eyebrow">Register</span>
          <h1>Create your NovaCart account</h1>
          <p>
            Fill in the fields below to create a new account for the learning
            e-commerce project.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <label className="field">
            <span>Password</span>
            <input
              className={errors.password ? 'input-error' : ''}
              type="password"
              name="password"
              placeholder="Create password"
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
            <span>Confirm Password</span>
            <input
              className={errors.confirmPassword ? 'input-error' : ''}
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
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
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <span>Use the login page.</span>
        </p>
      </section>

      <aside className="auth-side-note">
        <h2>New here?</h2>
        <p>
          Registration now supports frontend/backend validation, forbidden
          domains, and duplicate email checks.
        </p>
        <Link className="secondary-button" to="/login">
          Go to Login
        </Link>
      </aside>
    </div>
  );
}
