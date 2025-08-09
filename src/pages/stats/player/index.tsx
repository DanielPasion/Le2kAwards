// src/pages/StatsPlayerIndex.tsx
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import {
  DanielPasion,
  DylanPagaduan,
  JacobBustamante,
  JaredPasion,
  JusticeHowino,
  KurtPasion,
  ShaunFloro,
} from "../../../utils/players";

type Player = { name: string; handle: string; pfp: string };

const PLAYERS: Player[] = [
  { name: DanielPasion.name, handle: DanielPasion.ign, pfp: DanielPasion.pfp },
  {
    name: JacobBustamante.name,
    handle: JacobBustamante.ign,
    pfp: JacobBustamante.pfp,
  },
  { name: ShaunFloro.name, handle: ShaunFloro.ign, pfp: ShaunFloro.pfp },
  { name: KurtPasion.name, handle: KurtPasion.ign, pfp: KurtPasion.pfp },
  { name: JaredPasion.name, handle: JaredPasion.ign, pfp: JaredPasion.pfp },
  {
    name: DylanPagaduan.name,
    handle: DylanPagaduan.ign,
    pfp: DylanPagaduan.pfp,
  },
  {
    name: JusticeHowino.name,
    handle: JusticeHowino.ign,
    pfp: JusticeHowino.pfp,
  },
];

export default function StatsPlayerIndex() {
  const navigate = useNavigate();

  return (
    <div className="h-auto flex flex-col bg-black-950 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-32 top-0 h-64 w-64 bg-red-600/20 blur-3xl rounded-full" />
          <div className="absolute -left-32 bottom-0 h-64 w-64 bg-red-500/10 blur-3xl rounded-full" />
        </div>

        <div className="flex items-center gap-30 my-8 relative z-10">
          <button
            onClick={() => navigate("/stats")}
            className="text-sm text-red-500 hover:underline"
          >
            ← Back
          </button>
          <div className="flex gap-3">
            <img src="/logo.png" alt="Le2KAwards logo" className="h-8 w-auto" />
            <h1 className="text-2xl md:text-3xl font-extrabold relative">
              Player Stats
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600"></span>
            </h1>
          </div>
        </div>

        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          {PLAYERS.map((p) => (
            <PlayerLink
              key={p.handle}
              name={p.name}
              handle={p.handle}
              pfp={p.pfp}
            />
          ))}
        </div>
      </main>

      <footer className="bg-black-900 border-t border-black-800 text-center text-[10px] text-black-400 py-3 mt-3">
        © {new Date().getFullYear()} Le2KAwards by Daniel Pasion
      </footer>
    </div>
  );
}

function PlayerLink({
  name,
  handle,
  pfp,
}: {
  name: string;
  handle: string;
  pfp: string;
}) {
  return (
    <Link
      to={`/stats/player/${encodeURIComponent(handle)}`}
      className="group relative overflow-hidden rounded-2xl border border-black-800 bg-black-900/70 p-5 transition hover:scale-[1.02] hover:border-red-500/60"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full bg-black-800 border border-black-700 flex items-center justify-center text-sm font-bold"
            src={pfp}
          />
          <div>
            <div className="text-base font-semibold">{name}</div>
            <div className="text-sm text-black-300">@{handle}</div>
          </div>
        </div>
        <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-red-400">
          View Stats{" "}
          <span className="transition group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
