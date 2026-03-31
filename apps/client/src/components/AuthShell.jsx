import { useState } from 'react';
import { Link } from 'react-router-dom';

function GamepadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M7.5 8.5h9a4.5 4.5 0 0 1 4.39 5.47l-.89 4.01a2.5 2.5 0 0 1-4.22 1.25l-1.66-1.56a3 3 0 0 0-4.24 0l-1.66 1.56a2.5 2.5 0 0 1-4.22-1.25l-.89-4.01A4.5 4.5 0 0 1 7.5 8.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9 12.25v2.5M7.75 13.5h2.5M15.8 13.1h.01M18 14.7h.01"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M4.5 7.5h15a1.5 1.5 0 0 1 1.5 1.5v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a1.5 1.5 0 0 1 1.5-1.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m5 9 7 5 7-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M7.5 10V8a4.5 4.5 0 1 1 9 0v2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <rect
        x="4.5"
        y="10"
        width="15"
        height="10"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M14.5 7.5a4 4 0 1 1-3.85 5.1L4.5 18.75V20h1.75v-1.75H8V16.5h1.75V14.75H11l.6-.6a4.01 4.01 0 0 1 2.9-6.65Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M16.75 7.25h.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

function EyeIcon({ off = false }) {
  if (off) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="m3.5 3.5 17 17M10.6 10.6A2 2 0 0 0 13.4 13.4M9.12 5.08A10.94 10.94 0 0 1 12 4.75c4.62 0 8.38 2.99 9.75 7.25a10.42 10.42 0 0 1-3.2 4.74M6.16 6.16A10.84 10.84 0 0 0 2.25 12c1.37 4.26 5.13 7.25 9.75 7.25 1.58 0 3.08-.35 4.43-.97"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M2.25 12C3.62 7.74 7.38 4.75 12 4.75S20.38 7.74 21.75 12c-1.37 4.26-5.13 7.25-9.75 7.25S3.62 16.26 2.25 12Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="m14.5 6.5-5 5 5 5M19.5 11.5h-10"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function resolveIcon(icon) {
  switch (icon) {
    case 'mail':
      return <MailIcon />;
    case 'password':
      return <LockIcon />;
    case 'token':
      return <KeyIcon />;
    default:
      return null;
  }
}

export function AuthField({
  label,
  labelAdornment,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  icon = 'mail',
  toggleVisibility = false,
  testId,
  toggleTestId,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const resolvedType = toggleVisibility ? (isVisible ? 'text' : type) : type;

  return (
    <label className="auth-field">
      <span className="auth-label-row">
        <span className="auth-label">{label}</span>
        {labelAdornment}
      </span>
      <span className={error ? 'auth-input auth-input-error' : 'auth-input'}>
        <span className="auth-input-icon">{resolveIcon(icon)}</span>
        <input
          type={resolvedType}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          data-testid={testId ?? `auth-input-${name}`}
        />
        {toggleVisibility ? (
          <button
            className="auth-input-action"
            type="button"
            onClick={() => setIsVisible((current) => !current)}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            data-testid={toggleTestId ?? `${testId ?? `auth-input-${name}`}-toggle`}
          >
            <EyeIcon off={isVisible} />
          </button>
        ) : null}
      </span>
      {error ? <small className="error-text">{error}</small> : null}
    </label>
  );
}

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  backTo,
  backLabel,
  panelClassName = '',
}) {
  const panelClass = panelClassName ? `auth-panel ${panelClassName}` : 'auth-panel';

  return (
    <section className="auth-screen">
      <div className="auth-shell">
        <Link className="auth-brand" to="/" data-testid="auth-brand-link">
          <span className="auth-brand-mark">
            <GamepadIcon />
          </span>
          <span className="auth-brand-wordmark">
            Game<span>Reason</span>
          </span>
        </Link>

        <div className={panelClass}>
          {backTo && backLabel ? (
            <Link className="auth-back-link" to={backTo} data-testid="auth-back-link">
              <ArrowLeftIcon />
              <span>{backLabel}</span>
            </Link>
          ) : null}

          {eyebrow ? <span className="auth-badge">{eyebrow}</span> : null}
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>

          {children}
          {footer ? <div className="auth-panel-footer">{footer}</div> : null}
        </div>

        <p className="auth-page-footer">© 2026 GameReason. All rights reserved.</p>
      </div>
    </section>
  );
}
