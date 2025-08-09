import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function StatsIndex() {
  return (
    <div className="min-h-screen flex flex-col bg-black-950 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-32 top-0 h-64 w-64 bg-red-600/20 blur-3xl rounded-full" />
          <div className="absolute -left-32 bottom-0 h-64 w-64 bg-red-500/10 blur-3xl rounded-full" />
        </div>

        <div className="flex flex-col items-center gap-3 mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Le2KAwards logo" className="h-8 w-auto" />
            <h1 className="text-2xl md:text-3xl font-extrabold relative">
              Stats
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600"></span>
            </h1>
          </div>
          <p className="text-black-300 text-sm md:text-base text-center">
            Choose how you want to explore stats:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl relative z-10">
          <StatsCard
            to="/stats/game"
            title="By Game"
            description="See each player's individual stats per year"
          />
          <StatsCard
            to="/stats/player"
            title="By Player"
            description="Analyze stats for an individual player."
          />
        </div>
      </main>

      <footer className="bg-black-900 border-t border-black-800 text-center text-[10px] text-black-400 py-3 relative z-10">
        © {new Date().getFullYear()} Le2KAwards
      </footer>
    </div>
  );
}

function StatsCard({
  to,
  title,
  description,
}: {
  to: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-2xl border border-black-800 bg-black-900/70 p-6 transition hover:scale-[1.03] hover:border-red-500/60"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <h2 className="text-xl font-bold mb-2 relative z-10">{title}</h2>
      <p className="text-sm text-black-300 relative z-10">{description}</p>
      <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-400 relative z-10">
        Select
        <span className="transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
