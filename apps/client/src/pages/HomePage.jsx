import { Link } from 'react-router-dom';
import { getSession } from '../lib/auth';

export function HomePage() {
  const session = getSession();

  return (
    <section className="hero hero-full-width">
      <div className="hero-copy">
        <span className="eyebrow">E-commerce starter</span>
        <h1>Build your first online store flow from login to checkout.</h1>
        <p>
          This starter app begins with authentication screens and will grow into
          a full learning project with catalog, cart, and orders.
        </p>

        {session ? (
          <div className="status-banner">
            Signed in as <strong>{session.email}</strong>
          </div>
        ) : null}

        <div className="hero-actions">
          <Link className="primary-button" to="/login">
            Login
          </Link>
          <Link className="secondary-button" to="/register">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
