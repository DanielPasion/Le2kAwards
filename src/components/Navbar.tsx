import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black-900 border-b border-black-800">
      <div className="mx-auto max-w-6xl px-6 py-1 flex items-center justify-between">
        {/* Left side: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Le2KAwards logo" className="h-20 w-auto" />
        </Link>

        {/* Right side: nav links */}
        <div className="flex gap-6">
          <Link to="/awards" className="hover:text-red-500 transition-colors">
            Award History
          </Link>
          <Link
            to="/player-stats"
            className="hover:text-red-500 transition-colors"
          >
            Player Stats
          </Link>
        </div>
      </div>
    </nav>
  );
}
