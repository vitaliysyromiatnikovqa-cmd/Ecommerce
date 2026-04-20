import { Link } from 'react-router-dom';
import { getSession } from '../lib/auth';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useI18n } from '../lib/i18n';

const categories = ['All Games', 'PlayStation', 'Xbox', 'Nintendo', 'PC Gaming', 'Accessories', 'Deals'];

const featuredProducts = [
  {
    title: 'Retro Wireless Pad',
    tag: 'Sale',
    meta: 'PS5',
    accent: 'product-card-cool',
  },
  {
    title: 'Neon Console Stand',
    tag: 'Trending',
    meta: 'Console',
    accent: 'product-card-neon',
  },
  {
    title: 'Co-op Starter Pack',
    tag: 'New',
    meta: 'PC',
    accent: 'product-card-warm',
  },
  {
    title: 'HyperSound Headset',
    tag: 'Sale',
    meta: 'Multi',
    accent: 'product-card-shadow',
  },
];

function toTestIdPart(value) {
  return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

function BrandIcon() {
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

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 5.3-2.2L21 21"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M4 5h2l1.8 8.25a1 1 0 0 0 .98.75h8.74a1 1 0 0 0 .97-.78L20 8H7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="10" cy="19" r="1.2" fill="currentColor" />
      <circle cx="17" cy="19" r="1.2" fill="currentColor" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M19 20a7 7 0 1 0-14 0M12 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function HomePage() {
  const { t } = useI18n();
  const session = getSession();
  const email = session?.user?.email ?? '';

  return (
<<<<<<< Updated upstream
    <section className="storefront">
      <header className="storefront-header">
        <div className="storefront-header-main">
          <Link className="storefront-brand" to="/" data-testid="home-brand-link">
            <span className="storefront-brand-mark">
              <BrandIcon />
            </span>
            <span className="storefront-brand-wordmark">
              Game<span>Reason</span>
            </span>
          </Link>

          <label className="storefront-search">
            <span className="storefront-search-icon">
              <SearchIcon />
            </span>
            <input
              placeholder="Search games, consoles, accessories..."
              type="search"
              data-testid="home-search-input"
            />
          </label>

          <nav className="storefront-actions" aria-label="Store actions">
            <Link className="storefront-action-link" to="/" data-testid="home-cart-link">
              <CartIcon />
              <span>Cart</span>
              <span className="storefront-pill">3</span>
            </Link>

            {session ? (
              <Link className="storefront-action-link" to="/account" data-testid="home-account-link">
                <UserIcon />
                <span>{email.split('@')[0] || 'Account'}</span>
              </Link>
            ) : (
              <>
                <Link className="storefront-action-link" to="/login" data-testid="home-sign-in-link">
                  <UserIcon />
                  <span>Sign In</span>
                </Link>
                <Link className="primary-button storefront-signup" to="/register" data-testid="home-sign-up-link">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
=======
    <section className="hero hero-full-width">
      <div className="hero-copy">
        <div className="hero-toolbar">
          <LanguageSwitcher className="page-locale-switcher" />
        </div>

        <span className="eyebrow">{t('home.stagingEyebrow')}</span>
        <span className="eyebrow">{t('home.storefrontEyebrow')}</span>
        <h1>{t('home.title')}</h1>
        <p>{t('home.description')}</p>
        <p>{t('home.stagingDescription')}</p>

        {session ? (
          <div className="status-banner">
            {t('home.signedInPrefix')} <strong>{email}</strong>
          </div>
        ) : null}

        <div className="hero-actions">
          {session ? (
            <Link className="primary-button" to="/account">
              {t('home.openAccount')}
            </Link>
          ) : (
            <>
              <Link className="primary-button" to="/login">
                {t('home.signIn')}
              </Link>
              <Link className="secondary-button" to="/register">
                {t('home.createAccount')}
              </Link>
            </>
          )}
>>>>>>> Stashed changes
        </div>

        <nav className="storefront-categories" aria-label="Store categories">
          {categories.map((category) => (
            <Link
              key={category}
              className="storefront-category-link"
              to="/"
              data-testid={`home-category-${toTestIdPart(category)}-link`}
            >
              {category}
            </Link>
          ))}
        </nav>
      </header>

      <section className="storefront-hero">
        <div className="storefront-hero-copy">
          <span className="storefront-tag">New Arrivals</span>
          <h1>Level Up Your Gaming Experience</h1>
          <p>
            Discover the latest games, consoles, and accessories. Shop with confidence and build
            your setup around the titles you actually want to keep playing.
          </p>

          {session ? (
            <div className="status-banner">
              Signed in to GameReason as <strong>{email}</strong>
            </div>
          ) : null}

          <div className="storefront-hero-actions">
            <Link
              className="primary-button"
              to={session ? '/account' : '/register'}
              data-testid={session ? 'home-open-account-link' : 'home-shop-now-link'}
            >
              {session ? 'Open Account' : 'Shop Now'}
            </Link>
            <Link className="storefront-ghost-button" to="/login" data-testid="home-view-deals-link">
              View Deals
            </Link>
          </div>

          <div className="storefront-stats">
            <div>
              <strong>500+</strong>
              <span>Games</span>
            </div>
            <div>
              <strong>50K+</strong>
              <span>Gamers</span>
            </div>
            <div>
              <strong>4.9★</strong>
              <span>Rating</span>
            </div>
          </div>
        </div>

        <div className="storefront-hero-visual" aria-hidden="true">
          <div className="storefront-visual-card">
            <span className="storefront-visual-chip storefront-visual-chip-top">RGB Setup</span>
            <span className="storefront-visual-chip storefront-visual-chip-bottom">Hot Deals</span>
            <div className="storefront-visual-grid" />
            <div className="storefront-visual-glow storefront-visual-glow-pink" />
            <div className="storefront-visual-glow storefront-visual-glow-blue" />
          </div>
        </div>
      </section>

      <section className="storefront-products">
        <div className="storefront-section-head">
          <div>
            <h2>Featured Products</h2>
            <p>Handpicked items just for your setup.</p>
          </div>
          <Link className="storefront-inline-cta" to="/" data-testid="home-view-all-link">
            View All →
          </Link>
        </div>

        <div className="storefront-product-grid">
          {featuredProducts.map((product) => (
            <article key={product.title} className="storefront-product-card">
              <div className={`storefront-product-media ${product.accent}`}>
                <span className="storefront-product-tag">{product.tag}</span>
              </div>
              <div className="storefront-product-body">
                <span className="storefront-product-meta">{product.meta}</span>
                <h3>{product.title}</h3>
                <p>Curated gear and accessories designed to make your library feel complete.</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
