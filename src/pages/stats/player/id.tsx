// src/pages/StatsPlayerShow.tsx
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import type { PlayerModel, GameRow } from "../../../models/player";
import {
  DanielPasion,
  KurtPasion,
  DylanPagaduan,
  ShaunFloro,
  JacobBustamante,
  JaredPasion,
  JusticeHowino,
} from "../../../utils/players";

const PLAYERS: PlayerModel[] = [
  DanielPasion,
  KurtPasion,
  DylanPagaduan,
  ShaunFloro,
  JacobBustamante,
  JaredPasion,
  JusticeHowino,
];

const BY_IGN: Record<string, PlayerModel> = Object.fromEntries(
  PLAYERS.map((p) => [p.ign, p])
);
const IGNS = PLAYERS.map((p) => p.ign);

export default function StatsPlayerShow() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentIgn = useMemo(() => (id && BY_IGN[id] ? id : IGNS[0]), [id]);
  const player = BY_IGN[currentIgn];

  const seasons = useMemo(() => {
    const keys = Object.keys(player.stats ?? {});
    return keys.sort((a, b) => {
      const na = parseInt(a.replace(/[^\d]/g, ""), 10) || 0;
      const nb = parseInt(b.replace(/[^\d]/g, ""), 10) || 0;
      return nb - na;
    });
  }, [player.stats]);

  const allTime = useMemo(() => {
    const entries = seasons.flatMap(
      (s) => player.stats?.[s] ?? []
    ) as GameRow[];
    if (!entries.length) return undefined;

    let wSum = 0;
    let totalGp = 0;
    const acc = {
      ppg: 0,
      rpg: 0,
      apg: 0,
      spg: 0,
      bpg: 0,
      "3p": 0,
      ft: 0,
      fg: 0,
      tpg: 0,
      fpg: 0,
      winPct: 0,
    } as Record<keyof GameRow, number>;

    entries.forEach((g) => {
      const w = typeof g.gp === "number" && g.gp > 0 ? g.gp : 1;
      acc.ppg += (g.ppg ?? 0) * w;
      acc.rpg += (g.rpg ?? 0) * w;
      acc.apg += (g.apg ?? 0) * w;
      acc.spg += (g.spg ?? 0) * w;
      acc.bpg += (g.bpg ?? 0) * w;
      acc["3p"] += (g["3p"] ?? 0) * w;
      acc.ft += (g.ft ?? 0) * w;
      acc.fg += (g.fg ?? 0) * w;
      acc.tpg += (g.tpg ?? 0) * w;
      acc.fpg += (g.fpg ?? 0) * w;
      acc.winPct += (g.winPct ?? 0) * w;
      wSum += w;
      totalGp += g.gp ?? 0;
    });

    const norm = (v: number) => (wSum ? v / wSum : 0);
    return {
      gp: totalGp,
      ppg: norm(acc.ppg),
      rpg: norm(acc.rpg),
      apg: norm(acc.apg),
      spg: norm(acc.spg),
      bpg: norm(acc.bpg),
      "3p": norm(acc["3p"]),
      ft: norm(acc.ft),
      fg: norm(acc.fg),
      tpg: norm(acc.tpg),
      fpg: norm(acc.fpg),
      winPct: norm(acc.winPct),
    } as GameRow;
  }, [player.stats, seasons]);

  return (
    <div className="min-h-screen flex flex-col bg-black-950 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col md:flex-row max-w-6xl w-full mx-auto px-4 py-4 md:py-6 gap-4 md:gap-6">
        <aside className="w-full md:w-64 shrink-0 rounded-2xl border border-black-800 bg-black-900/70 p-4 h-fit">
          <button
            onClick={() => navigate("/stats/player")}
            className="mb-4 text-sm text-red-500 hover:underline"
          >
            ← Back
          </button>

          <div className="aspect-square w-full rounded-xl border border-black-800 bg-black-800/50 overflow-hidden flex items-center justify-center">
            {player.pfp ? (
              <img
                src={player.pfp}
                alt={player.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-4xl font-extrabold text-black-300">
                {player.name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="text-lg font-bold">{player.name}</div>
            <div className="text-sm text-black-300">@{player.ign}</div>
          </div>

          <div className="mt-4">
            <label htmlFor="switch" className="text-xs text-black-300">
              Switch Player
            </label>
            <select
              id="switch"
              className="mt-1 w-full rounded-lg bg-black-800 border border-black-700 px-3 py-2 text-sm"
              value={currentIgn}
              onChange={(e) =>
                navigate(`/stats/player/${encodeURIComponent(e.target.value)}`)
              }
            >
              {PLAYERS.map((p) => (
                <option key={p.ign} value={p.ign}>
                  {p.name} (@{p.ign})
                </option>
              ))}
            </select>
          </div>
        </aside>

        <section className="flex-1 min-w-0 space-y-6">
          <AllTimeTable game={allTime} />
          {seasons.map((season) => (
            <SeasonTable
              key={season}
              title={season}
              games={(player.stats[season] as GameRow[]) ?? []}
            />
          ))}
          {seasons.length === 0 && (
            <div className="rounded-2xl border border-black-800 bg-black-900/70 p-6 text-black-300">
              No stats available.
            </div>
          )}
        </section>
      </main>

      <footer className="bg-black-900 border-t border-black-800 text-center text-[10px] text-black-400 py-3">
        © {new Date().getFullYear()} Le2KAwards by Daniel Pasion
      </footer>
    </div>
  );
}

function AllTimeTable({ game }: { game: GameRow | undefined }) {
  return (
    <div className="rounded-2xl border border-black-800 bg-black-900/70">
      <div className="flex items-center gap-2 px-4 pt-3">
        <h2 className="text-lg font-bold">All-Time Averages</h2>
        <span className="h-0.5 w-10 bg-red-600 rounded-full" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-black-900/80">
            <tr className="[&>th]:px-3 [&>th]:py-2 text-black-300 whitespace-nowrap">
              <ThLabel label="GP" />
              <ThLabel label="PPG" />
              <ThLabel label="RPG" />
              <ThLabel label="APG" />
              <ThLabel label="SPG" className="hidden sm:table-cell" />
              <ThLabel label="BPG" className="hidden sm:table-cell" />
              <ThLabel label="3P%" className="hidden sm:table-cell" />
              <ThLabel label="FT%" className="hidden sm:table-cell" />
              <ThLabel label="FG%" />
              <ThLabel label="TPG" className="hidden sm:table-cell" />
              <ThLabel label="FPG" className="hidden sm:table-cell" />
              <ThLabel label="WIN %" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td num={game?.gp} />
              <Td num={game?.ppg} />
              <Td num={game?.rpg} />
              <Td num={game?.apg} />
              <Td num={game?.spg} className="hidden sm:table-cell" />
              <Td num={game?.bpg} className="hidden sm:table-cell" />
              <Td num={game?.["3p"]} pct className="hidden sm:table-cell" />
              <Td num={game?.ft} pct className="hidden sm:table-cell" />
              <Td num={game?.fg} pct />
              <Td num={game?.tpg} className="hidden sm:table-cell" />
              <Td num={game?.fpg} className="hidden sm:table-cell" />
              <Td num={game?.winPct} pct />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SeasonTable({ title, games }: { title: string; games: GameRow[] }) {
  return (
    <div className="rounded-2xl border border-black-800 bg-black-900/70">
      <div className="flex items-center gap-2 px-4 pt-3">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="h-0.5 w-10 bg-red-600 rounded-full" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-black-900/80">
            <tr className="[&>th]:px-3 [&>th]:py-2 text-black-300 whitespace-nowrap">
              <ThLabel label="GP" />
              <ThLabel label="PPG" />
              <ThLabel label="RPG" />
              <ThLabel label="APG" />
              <ThLabel label="SPG" className="hidden sm:table-cell" />
              <ThLabel label="BPG" className="hidden sm:table-cell" />
              <ThLabel label="3P%" className="hidden sm:table-cell" />
              <ThLabel label="FT%" className="hidden sm:table-cell" />
              <ThLabel label="FG%" />
              <ThLabel label="TPG" className="hidden sm:table-cell" />
              <ThLabel label="FPG" className="hidden sm:table-cell" />
              <ThLabel label="WIN %" />
            </tr>
          </thead>
          <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-black-800">
            {games.map((g, i) => (
              <tr key={i} className="hover:bg-black-800/40 transition">
                <Td num={g.gp} />
                <Td num={g.ppg} />
                <Td num={g.rpg} />
                <Td num={g.apg} />
                <Td num={g.spg} className="hidden sm:table-cell" />
                <Td num={g.bpg} className="hidden sm:table-cell" />
                <Td num={g["3p"]} pct className="hidden sm:table-cell" />
                <Td num={g.ft} pct className="hidden sm:table-cell" />
                <Td num={g.fg} pct />
                <Td num={g.tpg} className="hidden sm:table-cell" />
                <Td num={g.fpg} className="hidden sm:table-cell" />
                <Td num={g.winPct} pct />
              </tr>
            ))}
            {games.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-black-400" colSpan={12}>
                  No games recorded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ThLabel({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return <th className={className}>{label}</th>;
}

function Td({
  num,
  pct = false,
  className = "",
}: {
  num: number | undefined;
  pct?: boolean;
  className?: string;
}) {
  const formatNum = (n: number) => {
    // If whole number, don't add decimals
    if (Number.isInteger(n)) return n;
    // Limit to 2 decimal places
    return parseFloat(n.toFixed(2));
  };

  return (
    <td className={`px-3 py-2 tabular-nums ${className}`}>
      {num === undefined ? (
        <span className="text-black-400">—</span>
      ) : pct ? (
        `${Math.round(num)}%`
      ) : (
        formatNum(num)
      )}
    </td>
  );
}
