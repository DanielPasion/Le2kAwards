// src/pages/StatsGames.tsx
import { useMemo, useState } from "react";
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
import { useNavigate } from "react-router-dom";

type SeasonKey = "2K25" | "2K24";
const PLAYERS: PlayerModel[] = [
  DanielPasion,
  KurtPasion,
  DylanPagaduan,
  ShaunFloro,
  JacobBustamante,
  JaredPasion,
  JusticeHowino,
];
const SEASONS: SeasonKey[] = ["2K25", "2K24"];

type SortKey = keyof GameRow;
type SortDir = "asc" | "desc";

export default function StatsGameIndex() {
  const navigate = useNavigate();

  const [season, setSeason] = useState<SeasonKey>("2K25");
  const [sortKey, setSortKey] = useState<SortKey>("ppg");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const seasonImage = season === "2K25" ? "/2k25.jpeg" : "/2k24.jpeg";

  const rows = useMemo(() => {
    const list = PLAYERS.map((p) => {
      const g = (p.stats?.[season] ?? [])[0] as GameRow | undefined;
      return { player: p, stats: g };
    });
    const val = (g: GameRow | undefined, key: SortKey) =>
      g ? g[key] : undefined;
    const dir = sortDir === "desc" ? -1 : 1;
    list.sort((a, b) => {
      const av = val(a.stats, sortKey);
      const bv = val(b.stats, sortKey);
      if (av === undefined && bv === undefined) return 0;
      if (av === undefined) return 1 * dir;
      if (bv === undefined) return -1 * dir;
      if (av < bv) return 1 * dir;
      if (av > bv) return -1 * dir;
      return 0;
    });
    return list;
  }, [season, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };
  const sortIcon = (key: SortKey) =>
    key !== sortKey ? "↕" : sortDir === "desc" ? "▼" : "▲";

  return (
    <div className="min-h-screen flex flex-col bg-black-950 text-white">
      <Navbar />

      <main className="flex-1 flex flex-col md:flex-row max-w-6xl w-full mx-auto px-4 py-4 md:py-6 gap-4 md:gap-6">
        <aside className="w-full md:w-64 shrink-0 rounded-2xl border border-black-800 bg-black-900/70 p-4">
          <button
            onClick={() => navigate("/stats")}
            className="mb-4 text-sm text-red-500 hover:underline"
          >
            ← Back
          </button>
          <img
            src={seasonImage}
            alt={`${season} cover`}
            className="w-full h-40 md:h-auto rounded-xl border border-black-800 object-contain"
          />
          <div className="mt-3">
            <div className="text-lg font-bold">Game Stats</div>
            <div className="text-sm text-black-300">{season}</div>
          </div>
          <div className="mt-3">
            <label htmlFor="season" className="text-xs text-black-300">
              Switch Season
            </label>
            <select
              id="season"
              className="mt-1 w-full rounded-lg bg-black-800 border border-black-700 px-3 py-2 text-sm"
              value={season}
              onChange={(e) => setSeason(e.target.value as SeasonKey)}
            >
              {SEASONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <section className="flex-1 min-w-0">
          <div className="overflow-x-auto rounded-2xl border border-black-800 bg-black-900/70">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-black-900/80">
                <tr className="[&>th]:px-3 [&>th]:py-2 text-black-300 whitespace-nowrap">
                  <th className="min-w-[180px]">Player</th>

                  <Th
                    label="PPG"
                    icon={sortIcon("ppg")}
                    onClick={() => handleSort("ppg")}
                  />
                  <Th
                    label="RPG"
                    icon={sortIcon("rpg")}
                    onClick={() => handleSort("rpg")}
                  />
                  <Th
                    label="APG"
                    icon={sortIcon("apg")}
                    onClick={() => handleSort("apg")}
                  />

                  <Th
                    className="hidden sm:table-cell"
                    label="SPG"
                    icon={sortIcon("spg")}
                    onClick={() => handleSort("spg")}
                  />
                  <Th
                    className="hidden sm:table-cell"
                    label="BPG"
                    icon={sortIcon("bpg")}
                    onClick={() => handleSort("bpg")}
                  />
                  <Th
                    className="hidden sm:table-cell"
                    label="3P%"
                    icon={sortIcon("3p")}
                    onClick={() => handleSort("3p")}
                  />
                  <Th
                    className="hidden sm:table-cell"
                    label="FT%"
                    icon={sortIcon("ft")}
                    onClick={() => handleSort("ft")}
                  />

                  <Th
                    label="FG%"
                    icon={sortIcon("fg")}
                    onClick={() => handleSort("fg")}
                  />
                  <Th
                    className="hidden sm:table-cell"
                    label="TPG"
                    icon={sortIcon("tpg")}
                    onClick={() => handleSort("tpg")}
                  />
                  <Th
                    className="hidden sm:table-cell"
                    label="FPG"
                    icon={sortIcon("fpg")}
                    onClick={() => handleSort("fpg")}
                  />
                  <Th
                    label="WIN %"
                    icon={sortIcon("winPct")}
                    onClick={() => handleSort("winPct")}
                  />
                </tr>
              </thead>

              <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-black-800">
                {rows.map(({ player, stats }) => (
                  <tr
                    key={player.ign}
                    className="hover:bg-black-800/40 transition"
                  >
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={player.pfp}
                          alt={player.name}
                          className="h-8 w-8 rounded-full border border-black-700 object-cover"
                          onError={(e) => {
                            (
                              e.currentTarget as HTMLImageElement
                            ).style.display = "none";
                          }}
                        />
                        <div>
                          <div className="font-semibold">{player.name}</div>
                          <div className="text-black-300 text-[11px] sm:text-xs">
                            @{player.ign}
                          </div>
                        </div>
                      </div>
                    </td>
                    <Td num={stats?.ppg} />
                    <Td num={stats?.rpg} />
                    <Td num={stats?.apg} />
                    <Td className="hidden sm:table-cell" num={stats?.spg} />
                    <Td className="hidden sm:table-cell" num={stats?.bpg} />
                    <Td
                      className="hidden sm:table-cell"
                      num={stats?.["3p"]}
                      pct
                    />
                    <Td className="hidden sm:table-cell" num={stats?.ft} pct />
                    <Td num={stats?.fg} pct />
                    <Td className="hidden sm:table-cell" num={stats?.tpg} />
                    <Td className="hidden sm:table-cell" num={stats?.fpg} />
                    <Td num={stats?.winPct} pct />
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td className="px-3 py-6 text-black-400" colSpan={12}>
                      No data for {season}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="bg-black-900 border-t border-black-800 text-center text-[10px] text-black-400 py-3">
        © {new Date().getFullYear()} Le2KAwards
      </footer>
    </div>
  );
}

function Th({
  label,
  icon,
  onClick,
  className = "",
}: {
  label: string;
  icon: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <th className={className}>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1 hover:text-white"
      >
        {label} <span className="text-[10px] sm:text-xs">{icon}</span>
      </button>
    </th>
  );
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
  return (
    <td className={`px-3 py-2 tabular-nums ${className}`}>
      {num === undefined ? (
        <span className="text-black-400">—</span>
      ) : pct ? (
        `${Math.round(num)}%`
      ) : (
        num
      )}
    </td>
  );
}
