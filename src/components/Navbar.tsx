import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black-900 border-b border-black-800">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Le2KAwards logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex gap-6 text-sm font-medium">
          <NavLink to="/awards">Award History</NavLink>
          <NavLink to="/stats">Stats</NavLink>
          <NavLink to="/comparison">Player Comparisons</NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden text-white hover:text-red-500 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} size="lg" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-black-800 bg-black-900 flex flex-col px-4 py-3 space-y-2 text-sm font-medium">
          <NavLink to="/awards" onClick={() => setMenuOpen(false)}>
            Award History
          </NavLink>
          <NavLink to="/stats" onClick={() => setMenuOpen(false)}>
            Stats
          </NavLink>
          <NavLink to="/comparison" onClick={() => setMenuOpen(false)}>
            Player Comparisons
          </NavLink>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="hover:text-red-500 transition-colors"
    >
      {children}
    </Link>
  );
}
