import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCurrentUser, getCurrentUser, updateCurrentUser } from '../lib/api';
import { clearSession, getSession, saveSession } from '../lib/auth';
import { validateProfileForm } from '../lib/validation';

export function AccountPage() {
  const navigate = useNavigate();
  const session = getSession();
  const accessToken = session?.accessToken ?? '';
  const currentUserId = session?.user?.id ?? '';
  const [values, setValues] = useState({
    email: session?.user?.email ?? '',
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    let isMounted = true;

    getCurrentUser()
      .then((response) => {
        if (!isMounted) {
          return;
        }

        setValues({
          email: response.user.email,
        });
        saveSession({
          accessToken,
          user: response.user,
        });
      })
      .catch(() => {
        clearSession();
        navigate('/login');
      });

    return () => {
      isMounted = false;
    };
  }, [accessToken, navigate]);

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
    setSuccessMessage('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateProfileForm(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError('');
    setSuccessMessage('');

    try {
      const response = await updateCurrentUser(values);
      saveSession({
        accessToken: response.accessToken,
        user: response.user,
      });
      setValues({
        email: response.user.email,
      });
      setSuccessMessage(response.message);
    } catch (error) {
      setErrors(error.fieldErrors || {});
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteAccount() {
    if (!currentUserId) {
      return;
    }

    const isConfirmed = window.confirm(
      'Delete your GameReason account? This will remove your user record and sign you out.',
    );

    if (!isConfirmed) {
      return;
    }

    setIsDeleting(true);
    setFormError('');
    setSuccessMessage('');

    try {
      await deleteCurrentUser(currentUserId);
      clearSession();
      navigate('/register');
    } catch (error) {
      setErrors(error.fieldErrors || {});
      setFormError(error.message);
    } finally {
      setIsDeleting(false);
    }
  }

  function handleLogout() {
    clearSession();
    navigate('/login');
  }

  return (
    <div className="auth-layout">
      <section className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">Account</span>
          <h1>Manage your GameReason profile</h1>
          <p>
            Update your account email, sign out, or delete your profile from
            the platform.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Email</span>
            <input
              className={errors.email ? 'input-error' : ''}
              type="email"
              name="email"
              placeholder="Update your email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              data-testid="account-email-input"
            />
            {errors.email ? <small className="error-text">{errors.email}</small> : null}
          </label>

          {formError ? <div className="form-error-banner">{formError}</div> : null}
          {successMessage ? <div className="status-banner">{successMessage}</div> : null}

          <button
            className="primary-button auth-submit"
            type="submit"
            disabled={isSubmitting}
            data-testid="account-save-button"
          >
            {isSubmitting ? 'Saving profile...' : 'Save Profile'}
          </button>
        </form>

        <div className="stacked-actions">
          <button
            className="secondary-button"
            type="button"
            onClick={handleLogout}
            data-testid="account-sign-out-button"
          >
            Sign Out
          </button>
          <button
            className="danger-button"
            type="button"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            data-testid="account-delete-button"
          >
            {isDeleting ? 'Deleting account...' : 'Delete Account'}
          </button>
        </div>
      </section>

      <aside className="auth-side-note">
        <h2>Your identity hub</h2>
        <p>
          This cabinet is the first player profile area for GameReason. From
          here we can later grow into wishlist, order history, and game library
          sections.
        </p>
        <Link className="secondary-button" to="/" data-testid="account-back-home-link">
          Back to Home
        </Link>
      </aside>
    </div>
  );
}
