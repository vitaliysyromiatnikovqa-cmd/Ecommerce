import { Link } from 'react-router-dom';
import { getSession } from '../lib/auth';

export function HomePage() {
  const session = getSession();
  const email = session?.user?.email ?? '';

  return (
    <section className="hero hero-full-width">
      <div className="hero-copy">
        <span className="eyebrow">Staging Preview Environment</span>
        <span className="eyebrow">PC Game Storefront</span>
        <h1>Buy your next favorite game, deluxe edition, or soundtrack in one place.</h1>
        <p>
          GameReason is a digital game marketplace inspired by launcher-style
          stores, built to grow from auth into catalog, cart, checkout, and
          personal game library flows.
        </p>
        <p>
          This staging build is used to verify deploy, smoke, and regression
          flows before anything reaches production.
        </p>

        {session ? (
          <div className="status-banner">
            Signed in to GameReason as <strong>{email}</strong>
          </div>
        ) : null}

        <div className="hero-actions">
          {session ? (
            <Link className="primary-button" to="/account">
              Open Account
            </Link>
          ) : (
            <>
              <Link className="primary-button" to="/login">
                Sign In
              </Link>
              <Link className="secondary-button" to="/register">
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
