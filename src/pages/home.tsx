import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black-950 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <img
          src="/logo.png"
          alt="Le2KAwards logo"
          className="h-48 w-auto mb-6 drop-shadow-[0_4px_30px_rgba(255,0,0,0.35)]"
        />

        <h1 className="text-4xl font-extrabold mb-2">Le2KAwards</h1>
        <p className="text-lg text-black-300 max-w-xl mb-8">
          Welcome to the LeArchive
        </p>

        <div className="grid w-full max-w-3xl grid-cols-1 sm:grid-cols-3 gap-4">
          <HomeCard
            to="/stats"
            title="Stats"
            subtitle="Explore yearly & player data"
          />
          <HomeCard to="/awards" title="Awards" subtitle="History of winners" />
          <HomeCard
            to="/comparison"
            title="Comparison"
            subtitle="Head-to-head player comparisons"
          />
        </div>
      </main>

      <footer className="bg-black-900 border-t border-black-800 text-center text-xs text-black-400 py-4">
        © {new Date().getFullYear()} Le2KAwards by Daniel Pasion by Daniel
        Pasion
      </footer>
    </div>
  );
}

function HomeCard({
  to,
  title,
  subtitle,
}: {
  to: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-black-800 bg-black-900/70 p-6 text-left
                 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(255,0,0,0.15)]
                 transition transform hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-red-500 opacity-0 group-hover:opacity-100 transition">
          →
        </span>
      </div>
      <p className="mt-1 text-sm text-black-300">{subtitle}</p>
      <div className="mt-3 h-0.5 w-12 bg-red-600 rounded-full opacity-70 group-hover:opacity-100 transition" />
    </Link>
  );
}
