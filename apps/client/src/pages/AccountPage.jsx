import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { deleteCurrentUser, getCurrentUser, updateCurrentUser } from '../lib/api';
import { clearSession, getSession, saveSession } from '../lib/auth';
import { localizeApiError, translateKnownMessage, useI18n } from '../lib/i18n';
import { validateProfileForm } from '../lib/validation';

export function AccountPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

    const nextErrors = validateProfileForm(values, t);

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
      setSuccessMessage(translateKnownMessage(response.message, t));
    } catch (error) {
      const localizedError = localizeApiError(error, t);
      setErrors(localizedError.fieldErrors || {});
      setFormError(localizedError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function openDeleteModal() {
    setFormError('');
    setSuccessMessage('');
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    if (isDeleting) {
      return;
    }

    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    if (!currentUserId) {
      return;
    }

    setIsDeleting(true);
    setFormError('');
    setSuccessMessage('');

    try {
      await deleteCurrentUser(currentUserId);
      setIsDeleteModalOpen(false);
      clearSession();
      navigate('/register');
    } catch (error) {
      const localizedError = localizeApiError(error, t);
      setErrors(localizedError.fieldErrors || {});
      setFormError(localizedError.message);
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
        <div className="auth-toolbar">
          <LanguageSwitcher className="page-locale-switcher" />
        </div>

        <div className="auth-copy">
          <span className="eyebrow">{t('account.eyebrow')}</span>
          <h1>{t('account.title')}</h1>
          <p>{t('account.description')}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>{t('common.email')}</span>
            <input
              className={errors.email ? 'input-error' : ''}
              type="email"
              name="email"
              placeholder={t('account.emailPlaceholder')}
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
<<<<<<< Updated upstream
            {isSubmitting ? 'Saving profile...' : 'Save Profile'}
=======
            {isSubmitting ? t('common.savingProfile') : t('common.saveProfile')}
>>>>>>> Stashed changes
          </button>
        </form>

        <div className="stacked-actions">
          <button
            className="secondary-button"
            type="button"
            onClick={handleLogout}
            data-testid="account-sign-out-button"
          >
<<<<<<< Updated upstream
            Sign Out
=======
            {t('common.signOut')}
>>>>>>> Stashed changes
          </button>
          <button
            className="danger-button"
            type="button"
            onClick={openDeleteModal}
            disabled={isDeleting}
            data-testid="account-delete-button"
          >
            {isDeleting ? t('common.deletingAccount') : t('common.deleteAccount')}
          </button>
        </div>
      </section>

      <aside className="auth-side-note">
<<<<<<< Updated upstream
        <h2>Your identity hub</h2>
        <p>
          This cabinet is the first player profile area for GameReason. From
          here we can later grow into wishlist, order history, and game library
          sections.
        </p>
        <Link className="secondary-button" to="/" data-testid="account-back-home-link">
          Back to Home
=======
        <h2>{t('account.sideTitle')}</h2>
        <p>{t('account.sideDescription')}</p>
        <Link className="secondary-button" to="/">
          {t('common.backToHome')}
>>>>>>> Stashed changes
        </Link>
      </aside>

      {isDeleteModalOpen ? (
        <div
          className="confirm-modal-overlay"
          onClick={closeDeleteModal}
          data-testid="account-delete-modal-overlay"
        >
          <div
            className="confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-delete-modal-title"
            onClick={(event) => event.stopPropagation()}
            data-testid="account-delete-modal"
          >
            <h2 id="account-delete-modal-title">{t('account.deleteModalTitle')}</h2>
            <p>{t('account.deleteModalDescription')}</p>
            <div className="confirm-modal-actions">
              <button
                className="secondary-button"
                type="button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
                data-testid="account-delete-cancel-button"
              >
                {t('account.deleteModalCancel')}
              </button>
              <button
                className="danger-button"
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                data-testid="account-delete-confirm-button"
              >
                {isDeleting
                  ? t('common.deletingAccount')
                  : t('account.deleteModalConfirm')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
