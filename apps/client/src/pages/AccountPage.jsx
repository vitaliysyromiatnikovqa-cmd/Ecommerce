import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { deleteCurrentUser, getCurrentUser } from '../lib/api';
import { clearSession, getSession, saveSession } from '../lib/auth';
import { localizeApiError, useI18n } from '../lib/i18n';
import { validateAccountProfileForm } from '../lib/validation';

const DEFAULT_PROFILE = {
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+380501234567',
};

const DEFAULT_ADDRESS = {
  fullName: 'John Doe',
  streetAddress: '123 Gaming Street Apt 4B',
  city: 'Kyiv',
  zipCode: '01001',
  country: 'Ukraine',
};

const RECENT_ORDERS = [
  {
    id: 'ORD-2026-001',
    date: '2026-04-15',
    status: 'Delivered',
    total: '$149.99',
    tone: 'success',
  },
  {
    id: 'ORD-2026-002',
    date: '2026-04-10',
    status: 'Shipped',
    total: '$89.99',
    tone: 'info',
  },
  {
    id: 'ORD-2026-003',
    date: '2026-04-05',
    status: 'Processing',
    total: '$199.99',
    tone: 'warning',
  },
];

const ACCOUNT_TABS = [
  { id: 'summary', label: 'Summary', icon: 'grid' },
  { id: 'profile', label: 'Profile', icon: 'user' },
  { id: 'security', label: 'Security', icon: 'lock' },
  { id: 'addresses', label: 'Addresses', icon: 'pin' },
  { id: 'orders', label: 'Orders', icon: 'box' },
];

function Icon({ name }) {
  const commonProps = {
    'aria-hidden': 'true',
    viewBox: '0 0 24 24',
  };

  if (name === 'cart') {
    return (
      <svg {...commonProps}>
        <path d="M4 5h2l1.8 8.25a1 1 0 0 0 .98.75h8.74a1 1 0 0 0 .97-.78L20 8H7" />
        <circle cx="10" cy="19" r="1.2" />
        <circle cx="17" cy="19" r="1.2" />
      </svg>
    );
  }

  if (name === 'search') {
    return (
      <svg {...commonProps}>
        <path d="M10.5 18a7.5 7.5 0 1 1 5.3-2.2L21 21" />
      </svg>
    );
  }

  if (name === 'gamepad') {
    return (
      <svg {...commonProps}>
        <path d="M7.5 8.5h9a4.5 4.5 0 0 1 4.39 5.47l-.89 4.01a2.5 2.5 0 0 1-4.22 1.25l-1.66-1.56a3 3 0 0 0-4.24 0l-1.66 1.56a2.5 2.5 0 0 1-4.22-1.25l-.89-4.01A4.5 4.5 0 0 1 7.5 8.5Z" />
        <path d="M9 12.25v2.5M7.75 13.5h2.5M15.8 13.1h.01M18 14.7h.01" />
      </svg>
    );
  }

  const paths = {
    grid: 'M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z',
    user: 'M19 20a7 7 0 1 0-14 0M12 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
    lock: 'M7.5 10V8a4.5 4.5 0 1 1 9 0v2M5 10h14v10H5V10Z',
    pin: 'M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
    box: 'M4.5 8.5 12 4l7.5 4.5V16L12 20.5 4.5 16V8.5ZM12 12.5 19.5 8M12 12.5 4.5 8M12 12.5v8',
    edit: 'M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16v4Z',
  };

  return (
    <svg {...commonProps}>
      <path d={paths[name]} />
    </svg>
  );
}

function getFullName(profile) {
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  return fullName || 'GameReason Player';
}

function buildProfile(user) {
  return {
    firstName: user?.firstName ?? DEFAULT_PROFILE.firstName,
    lastName: user?.lastName ?? DEFAULT_PROFILE.lastName,
    email: user?.email ?? '',
    phoneNumber: user?.phoneNumber ?? DEFAULT_PROFILE.phoneNumber,
  };
}

function DetailItem({ label, value, testId }) {
  return (
    <div className="account-detail-item" data-testid={testId}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AccountHeader({ profile }) {
  return (
    <header className="account-storefront-header" data-testid="account-storefront-header">
      <div className="account-header-main">
        <Link className="storefront-brand" to="/" data-testid="account-brand-link">
          <span className="storefront-brand-mark">
            <Icon name="gamepad" />
          </span>
          <span className="storefront-brand-wordmark">
            Game<span>Reason</span>
          </span>
        </Link>

        <label className="storefront-search account-search">
          <span className="storefront-search-icon">
            <Icon name="search" />
          </span>
          <input placeholder="Search games, consoles, accessories..." type="search" />
        </label>

        <nav className="storefront-actions account-header-actions" aria-label="Account actions">
          <Link className="storefront-action-link" to="/" data-testid="account-cart-link">
            <Icon name="cart" />
            <span>Cart</span>
            <span className="storefront-pill">3</span>
          </Link>
          <Link className="storefront-action-link" to="/account" data-testid="account-profile-link">
            <Icon name="user" />
            <span>{getFullName(profile).split(' ')[0]}</span>
          </Link>
          <LanguageSwitcher className="page-locale-switcher" />
        </nav>
      </div>

      <nav className="storefront-categories account-categories" aria-label="Store categories">
        {['All Games', 'PlayStation', 'Xbox', 'Nintendo', 'PC Gaming', 'Accessories', 'Deals'].map(
          (item) => (
            <Link key={item} className="storefront-category-link" to="/">
              {item}
            </Link>
          ),
        )}
      </nav>
    </header>
  );
}

export function AccountPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const session = getSession();
  const accessToken = session?.accessToken ?? '';
  const currentUserId = session?.user?.id ?? '';
  const [activeTab, setActiveTab] = useState('summary');
  const [profile, setProfile] = useState(() => buildProfile(session?.user));
  const [draftProfile, setDraftProfile] = useState(() => buildProfile(session?.user));
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
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

        const storedSession = getSession();
        const mergedUser = {
          ...response.user,
          firstName: storedSession?.user?.firstName ?? DEFAULT_PROFILE.firstName,
          lastName: storedSession?.user?.lastName ?? DEFAULT_PROFILE.lastName,
          phoneNumber: storedSession?.user?.phoneNumber ?? DEFAULT_PROFILE.phoneNumber,
        };
        const nextProfile = buildProfile(mergedUser);

        setProfile(nextProfile);
        setDraftProfile(nextProfile);
        saveSession({
          accessToken,
          user: mergedUser,
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

  function handleProfileChange(event) {
    const { name, value } = event.target;
    setDraftProfile((current) => ({
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

  function handleProfileSubmit(event) {
    event.preventDefault();

    if (!isEditing) {
      setIsEditing(true);
      setSuccessMessage('');
      return;
    }

    const nextErrors = validateAccountProfileForm(draftProfile, t);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage('');
      return;
    }

    try {
      const nextProfile = {
        ...draftProfile,
        firstName: draftProfile.firstName.trim(),
        lastName: draftProfile.lastName.trim(),
        phoneNumber: draftProfile.phoneNumber.trim(),
      };

      const nextUser = {
        ...(getSession()?.user ?? {}),
        ...nextProfile,
        email: profile.email,
      };

      saveSession({
        accessToken,
        user: nextUser,
      });
      setProfile(nextProfile);
      setDraftProfile(nextProfile);
      setIsEditing(false);
      setFormError('');
      setSuccessMessage('Profile updated successfully');
    } catch {
      setFormError('Profile update failed');
      setSuccessMessage('');
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

  const orderStats = {
    totalOrders: RECENT_ORDERS.length + 1,
    delivered: RECENT_ORDERS.filter((order) => order.status === 'Delivered').length + 1,
    inProgress: RECENT_ORDERS.filter((order) => order.status === 'Processing').length + 1,
    totalSpent: '$499.96',
  };

  return (
    <section className="account-page">
      <AccountHeader profile={profile} />

      <div className="account-page-inner">
        <div className="account-heading">
          <h1>My Account</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className="account-tabs" role="tablist" aria-label="Account sections">
          {ACCOUNT_TABS.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'account-tab account-tab-active' : 'account-tab'}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`account-tab-${tab.id}`}
            >
              <Icon name={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'summary' ? (
          <div className="account-summary-grid" data-testid="account-summary-tab">
            <section className="account-panel" data-testid="account-information-block">
              <div className="account-panel-heading">
                <h2>Account Information</h2>
                <p>Your basic account details</p>
              </div>
              <DetailItem label="Full Name" value={getFullName(profile)} testId="account-summary-full-name" />
              <DetailItem label="Email Address" value={profile.email} testId="account-summary-email" />
              <DetailItem label="Phone Number" value={profile.phoneNumber} testId="account-summary-phone" />
            </section>

            <section className="account-panel" data-testid="default-address-block">
              <div className="account-panel-heading">
                <h2>Default Address</h2>
                <p>Your primary shipping address</p>
              </div>
              <div className="account-address-card">
                <strong data-testid="account-address-full-name">{DEFAULT_ADDRESS.fullName}</strong>
                <span data-testid="account-address-street">{DEFAULT_ADDRESS.streetAddress}</span>
                <span data-testid="account-address-city-zip">
                  {DEFAULT_ADDRESS.city}, {DEFAULT_ADDRESS.zipCode}
                </span>
                <span data-testid="account-address-country">{DEFAULT_ADDRESS.country}</span>
              </div>
            </section>

            <section className="account-panel account-panel-wide" data-testid="order-statistics-block">
              <div className="account-panel-heading">
                <h2>Order Statistics</h2>
                <p>Your order history summary</p>
              </div>
              <div className="account-stats-grid">
                <DetailItem label="Total Orders" value={orderStats.totalOrders} testId="account-total-orders" />
                <DetailItem label="Delivered" value={orderStats.delivered} testId="account-delivered-orders" />
                <DetailItem label="In Progress" value={orderStats.inProgress} testId="account-in-progress-orders" />
                <DetailItem label="Total Spent" value={orderStats.totalSpent} testId="account-total-spent" />
              </div>
            </section>

            <section className="account-panel account-panel-wide" data-testid="recent-orders-block">
              <div className="account-panel-heading">
                <h2>Recent Orders</h2>
                <p>Your latest purchases</p>
              </div>
              <div className="account-orders-list">
                {RECENT_ORDERS.map((order) => (
                  <article className="account-order-row" key={order.id} data-testid={`recent-order-${order.id}`}>
                    <div>
                      <strong>{order.id}</strong>
                      <span>{order.date}</span>
                    </div>
                    <div className="account-order-meta">
                      <span className={`account-status account-status-${order.tone}`}>{order.status}</span>
                      <strong>{order.total}</strong>
                    </div>
                  </article>
                ))}
              </div>
              <button
                className="account-outline-button"
                type="button"
                onClick={() => setActiveTab('orders')}
                data-testid="account-view-all-orders-button"
              >
                View All Orders
              </button>
            </section>
          </div>
        ) : null}

        {activeTab === 'profile' ? (
          <section className="account-panel account-profile-panel" data-testid="account-profile-tab">
            <div className="account-panel-heading">
              <h2>Profile Information</h2>
              <p>Update your personal information</p>
            </div>

            <form className="account-profile-form" onSubmit={handleProfileSubmit} noValidate>
              <label className="account-field">
                <span>First Name</span>
                <input
                  type="text"
                  name="firstName"
                  value={draftProfile.firstName}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  data-testid="account-profile-first-name-input"
                />
              </label>

              <label className="account-field">
                <span>Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  value={draftProfile.lastName}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  data-testid="account-profile-last-name-input"
                />
              </label>

              <label className="account-field account-field-full">
                <span>Email</span>
                <input
                  className="account-input-disabled"
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  data-testid="account-profile-email-input"
                />
              </label>

              <label className="account-field account-field-full">
                <span>Phone Number</span>
                <input
                  className={errors.phoneNumber ? 'input-error' : ''}
                  type="tel"
                  name="phoneNumber"
                  placeholder="+380501234567"
                  value={draftProfile.phoneNumber}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  aria-invalid={Boolean(errors.phoneNumber)}
                  data-testid="account-profile-phone-input"
                />
                {errors.phoneNumber ? (
                  <small className="error-text">{errors.phoneNumber}</small>
                ) : null}
              </label>

              {formError ? <div className="form-error-banner account-field-full">{formError}</div> : null}
              {successMessage ? <div className="status-banner account-field-full">{successMessage}</div> : null}

              <button
                className="primary-button account-profile-submit"
                type="submit"
                data-testid="account-profile-save-button"
              >
                <Icon name="edit" />
                <span>{isEditing ? 'Save Profile' : 'Edit Profile'}</span>
              </button>
            </form>
          </section>
        ) : null}

        {activeTab === 'security' ? (
          <section className="account-panel account-panel-wide" data-testid="account-security-tab">
            <div className="account-panel-heading">
              <h2>Security</h2>
              <p>Sign out or remove your account from GameReason.</p>
            </div>
            <div className="stacked-actions account-security-actions">
              <button
                className="secondary-button"
                type="button"
                onClick={handleLogout}
                data-testid="account-sign-out-button"
              >
                {t('common.signOut')}
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
        ) : null}

        {activeTab === 'addresses' ? (
          <section className="account-panel account-panel-wide" data-testid="account-addresses-tab">
            <div className="account-panel-heading">
              <h2>Addresses</h2>
              <p>Your primary shipping address</p>
            </div>
            <div className="account-address-card">
              <strong>{DEFAULT_ADDRESS.fullName}</strong>
              <span>{DEFAULT_ADDRESS.streetAddress}</span>
              <span>
                {DEFAULT_ADDRESS.city}, {DEFAULT_ADDRESS.zipCode}
              </span>
              <span>{DEFAULT_ADDRESS.country}</span>
            </div>
          </section>
        ) : null}

        {activeTab === 'orders' ? (
          <section className="account-panel account-panel-wide" data-testid="account-orders-tab">
            <div className="account-panel-heading">
              <h2>Orders</h2>
              <p>All visible order activity for this preview account</p>
            </div>
            <div className="account-orders-list">
              {RECENT_ORDERS.map((order) => (
                <article className="account-order-row" key={order.id}>
                  <div>
                    <strong>{order.id}</strong>
                    <span>{order.date}</span>
                  </div>
                  <div className="account-order-meta">
                    <span className={`account-status account-status-${order.tone}`}>{order.status}</span>
                    <strong>{order.total}</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>

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
                {isDeleting ? t('common.deletingAccount') : t('account.deleteModalConfirm')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
