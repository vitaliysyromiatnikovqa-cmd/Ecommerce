import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthField, AuthShell } from '../components/AuthShell';
import { registerUser } from '../lib/api';
import { saveSession } from '../lib/auth';
<<<<<<< Updated upstream
import { localizeApiError, useI18n } from '../lib/i18n';
=======
import { useI18n } from '../lib/i18n';
>>>>>>> Stashed changes
import { validateRegisterForm } from '../lib/validation';

function PasswordRulesTooltip() {
  return (
    <span className="password-rules-tooltip">
      <button
        className="password-rules-trigger"
        type="button"
        aria-label="View password rules"
        data-testid="register-password-rules-trigger"
      >
        ?
      </button>
      <span
        className="password-rules-popover"
        role="tooltip"
        data-testid="register-password-rules-tooltip"
      >
        <strong>Password rules</strong>
        <span>At least 8 characters</span>
        <span>At least 1 uppercase English letter</span>
        <span>At least 1 digit</span>
        <span>At least 1 special character</span>
        <span>English letters, digits, and special characters only</span>
      </span>
    </span>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const { t } = useI18n();
=======
  const { t, translateText } = useI18n();
>>>>>>> Stashed changes
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  function handleChange(event) {
    const { checked, name, type, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((current) => ({
      ...current,
      [name]: '',
    }));
    setFormError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

<<<<<<< Updated upstream
    const nextErrors = validateRegisterForm(values, t);
    const fullName = values.fullName.trim();
=======
    const nextErrors = validateRegisterForm(values, translateText);
>>>>>>> Stashed changes

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await registerUser({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        fullName,
        termsAccepted: values.termsAccepted,
      });
      const [firstName = '', ...lastNameParts] = fullName.split(/\s+/);

      saveSession({
        accessToken: response.accessToken,
        user: {
          ...response.user,
          firstName,
          lastName: lastNameParts.join(' '),
        },
      });
      navigate('/account');
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
      shellBackTo="/"
      shellBackLabel="Back to Home"
      title="Create Account"
      subtitle="Join GameReason marketplace today"
      footer={
        <p className="auth-helper-text auth-helper-text-centered">
          Already have an account?{' '}
          <Link className="auth-inline-link" to="/login" data-testid="register-sign-in-link">
            Sign In
          </Link>
        </p>
      }
      panelClassName="auth-panel-wide"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthField
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          icon="user"
          testId="register-full-name-input"
        />

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
          testId="register-email-input"
        />

        <AuthField
          label="Password"
          labelAdornment={<PasswordRulesTooltip />}
          name="password"
          type="password"
          placeholder="Create your password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          icon="password"
          toggleVisibility
          testId="register-password-input"
          toggleTestId="register-password-toggle"
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
          testId="register-confirm-password-input"
          toggleTestId="register-confirm-password-toggle"
        />

        <label className={errors.termsAccepted ? 'auth-check auth-terms auth-terms-error' : 'auth-check auth-terms'}>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={values.termsAccepted}
            onChange={handleChange}
            aria-invalid={Boolean(errors.termsAccepted)}
            data-testid="register-terms-checkbox"
          />
          <span>
            I agree to the{' '}
            <Link className="auth-inline-link" to="/terms" data-testid="register-terms-link">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link className="auth-inline-link" to="/privacy" data-testid="register-privacy-link">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.termsAccepted ? (
          <small className="error-text" data-testid="register-terms-error">
            {errors.termsAccepted}
          </small>
        ) : null}

        {formError ? <div className="form-error-banner">{formError}</div> : null}

        <button
          className="primary-button auth-submit auth-submit-wide"
          type="submit"
          disabled={isSubmitting}
          data-testid="register-submit-button"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </AuthShell>
=======
    <div className="auth-layout">
      <section className="auth-card">
        <div className="auth-copy">
          <span className="eyebrow">{t('register.eyebrow')}</span>
          <h1>{t('register.title')}</h1>
          <p>{t('register.description')}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>{t('common.email')}</span>
            <input
              data-testid="register-email-input"
              className={errors.email ? 'input-error' : ''}
              type="email"
              name="email"
              placeholder={t('register.emailPlaceholder')}
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <small className="error-text">{errors.email}</small> : null}
          </label>

          <label className="field">
            <div className="field-header">
              <span>{t('common.password')}</span>
              <div
                className="tooltip-anchor"
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
                onFocus={() => setIsTooltipVisible(true)}
                onBlur={() => setIsTooltipVisible(false)}
              >
                <button
                  className="tooltip-trigger"
                  data-testid="register-password-rules-trigger"
                  type="button"
                  aria-label={t('register.passwordRules')}
                >
                  ?
                </button>
                <div
                  className={isTooltipVisible ? 'tooltip-bubble tooltip-bubble-visible' : 'tooltip-bubble'}
                  data-testid="register-password-rules-tooltip"
                  role="tooltip"
                >
                  <strong>{t('register.passwordRules')}</strong>
                  <ul>
                    <li>{t('register.passwordRuleMinLength')}</li>
                    <li>{t('register.passwordRuleUppercase')}</li>
                    <li>{t('register.passwordRuleDigit')}</li>
                    <li>{t('register.passwordRuleSpecial')}</li>
                    <li>{t('register.passwordRuleCharset')}</li>
                  </ul>
                </div>
              </div>
            </div>
            <input
              data-testid="register-password-input"
              className={errors.password ? 'input-error' : ''}
              type="password"
              name="password"
              placeholder={t('register.passwordPlaceholder')}
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
            <span>{t('common.confirmPassword')}</span>
            <input
              data-testid="register-confirm-password-input"
              className={errors.confirmPassword ? 'input-error' : ''}
              type="password"
              name="confirmPassword"
              placeholder={t('register.confirmPasswordPlaceholder')}
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

          <button
            className="primary-button auth-submit"
            data-testid="register-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('register.submitting') : t('common.createAccount')}
          </button>
        </form>

        <p className="auth-footer">
          {t('register.existingAccount')} <span>{t('register.existingAccountHighlight')}</span>
        </p>
        <Link className="secondary-button" data-testid="register-sign-in-link" to="/login">
          {t('common.signIn')}
        </Link>
      </section>

      <aside className="auth-side-note">
        <h2>{t('register.sideTitle')}</h2>
        <p>{t('register.sideDescription')}</p>
        <Link className="secondary-button" to="/login">
          {t('register.goToSignIn')}
        </Link>
      </aside>
    </div>
>>>>>>> Stashed changes
  );
}
