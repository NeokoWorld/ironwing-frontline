import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-container">
        <a href="/" rel="noreferrer" className="site-title">
          Ironwings Frontline
        </a>

        <button
          className="burger-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>

        <nav className={`site-nav ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" label="Accueil" />
          <NavLink to="/map" label="Carte" />
          <NavLink to="/characters" label="Personnages" />
          <NavLink to="/nations" label="Nations" />
          <NavLink to="/aircrafts" label="Avions" />
          <NavLink to="/timeline" label="Chronologie" />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="nav-link">
      {label}
    </Link>
  );
}
