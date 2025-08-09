// src/pages/ComparisonIndex.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import type { PlayerModel, GameRow } from "../../models/player";
import {
  DanielPasion,
  KurtPasion,
  DylanPagaduan,
  ShaunFloro,
  JacobBustamante,
  JaredPasion,
  JusticeHowino,
} from "../../utils/players";

const PLAYERS: PlayerModel[] = [
  DanielPasion,
  KurtPasion,
  DylanPagaduan,
  ShaunFloro,
  JacobBustamante,
  JaredPasion,
  JusticeHowino,
];

type Mode = "all" | "season";
type StatKey = keyof GameRow;

const METRICS: {
  key: StatKey;
  label: string;
  pct?: boolean;
  higherBetter: boolean;
}[] = [
  { key: "gp", label: "GP", higherBetter: true },
  { key: "ppg", label: "PPG", higherBetter: true },
  { key: "rpg", label: "RPG", higherBetter: true },
  { key: "apg", label: "APG", higherBetter: true },
  { key: "spg", label: "SPG", higherBetter: true },
  { key: "bpg", label: "BPG", higherBetter: true },
  { key: "3p", label: "3P%", pct: true, higherBetter: true },
  { key: "ft", label: "FT%", pct: true, higherBetter: true },
  { key: "fg", label: "FG%", pct: true, higherBetter: true },
  { key: "tpg", label: "TPG", higherBetter: false },
  { key: "fpg", label: "FPG", higherBetter: false },
  { key: "winPct", label: "WIN %", pct: true, higherBetter: true },
];

const ALL_SEASONS = Array.from(
  new Set(PLAYERS.flatMap((p) => Object.keys(p.stats ?? {})))
).sort((a, b) => {
  const na = parseInt(a.replace(/[^\d]/g, ""), 10) || 0;
  const nb = parseInt(b.replace(/[^\d]/g, ""), 10) || 0;
  return nb - na;
});

export default function ComparisonIndex() {
  const navigate = useNavigate();
  const [left, setLeft] = useState(PLAYERS[0].ign);
  const [right, setRight] = useState(PLAYERS[1]?.ign ?? PLAYERS[0].ign);
  const [mode, setMode] = useState<Mode>("all");
  const [season, setSeason] = useState<string>(ALL_SEASONS[0] ?? "2K25");

  const L = useMemo(() => PLAYERS.find((p) => p.ign === left)!, [left]);
  const R = useMemo(() => PLAYERS.find((p) => p.ign === right)!, [right]);

  const dataL = useMemo(
    () => (mode === "all" ? allTime(L) : seasonRow(L, season)),
    [L, mode, season]
  );
  const dataR = useMemo(
    () => (mode === "all" ? allTime(R) : seasonRow(R, season)),
    [R, mode, season]
  );

  const { aWins, bWins } = useMemo(() => {
    let a = 0,
      b = 0;
    METRICS.forEach((m) => {
      const va = safeGet(dataL, m.key);
      const vb = safeGet(dataR, m.key);
      if (va === undefined || vb === undefined) return;
      const cmp = compareVals(va, vb, m.higherBetter);
      if (cmp > 0) a++;
      else if (cmp < 0) b++;
    });
    return { aWins: a, bWins: b };
  }, [dataL, dataR]);

  const winner = aWins > bWins ? L.name : bWins > aWins ? R.name : "Tie";

  return (
    <div className="min-h-screen flex flex-col bg-black-950 text-white">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-5 space-y-5">
        {/* Header with back left and centered title */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => navigate("/")}
            className="absolute left-0 text-sm text-red-500 hover:underline"
          >
            ← Back
          </button>
          <div className="flex gap-2 items-center">
            <img src="/logo.png" alt="Le2KAwards logo" className="h-7 w-auto" />
            <h1 className="text-2xl md:text-3xl font-extrabold relative">
              Player Comparison
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600" />
            </h1>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Picker
            label="Player 1 (Left)"
            value={left}
            onChange={setLeft}
            exclude={right}
          />
          <Picker
            label="Player 2 (Right)"
            value={right}
            onChange={setRight}
            exclude={left}
          />
          <div className="rounded-2xl border border-black-800 bg-black-900/70 p-3">
            <div className="text-[11px] text-black-300 mb-2">Mode</div>
            <div className="flex gap-2">
              <Toggle active={mode === "all"} onClick={() => setMode("all")}>
                All Time
              </Toggle>
              <Toggle
                active={mode === "season"}
                onClick={() => setMode("season")}
              >
                By Season
              </Toggle>
            </div>
            {mode === "season" && (
              <div className="mt-2">
                <label className="text-[11px] text-black-300">Season</label>
                <select
                  className="mt-1 w-full rounded-lg bg-black-800 border border-black-700 px-3 py-2 text-sm"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                >
                  {ALL_SEASONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Side-by-side comparison (compact) */}
        <div className="rounded-2xl border border-black-800 bg-black-900/70">
          {/* Player headers */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 p-3">
            <PlayerHeader side="left" p={L} />
            <div className="text-center text-black-300 text-[11px]">Stat</div>
            <PlayerHeader side="right" p={R} />
          </div>

          {/* Metric rows */}
          <div>
            {METRICS.map((m) => {
              const va = safeGet(dataL, m.key);
              const vb = safeGet(dataR, m.key);
              const cmp =
                va === undefined || vb === undefined
                  ? 0
                  : compareVals(va, vb, m.higherBetter);
              const aCls =
                cmp > 0
                  ? "bg-green-600/15 text-green-300"
                  : cmp < 0
                  ? "bg-red-600/15 text-red-300"
                  : "text-white";
              const bCls =
                cmp < 0
                  ? "bg-green-600/15 text-green-300"
                  : cmp > 0
                  ? "bg-red-600/15 text-red-300"
                  : "text-white";

              return (
                <div
                  key={m.key as string}
                  className="grid grid-cols-[1fr_auto_1fr] gap-1 border-t border-black-850"
                >
                  <div
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 tabular-nums ${aCls}`}
                  >
                    <span className="text-xs sm:text-sm">
                      {formatVal(va, m.pct)}
                    </span>
                  </div>
                  <div className="px-2 py-1 sm:px-3 sm:py-1.5 text-center text-black-300">
                    <span className="text-[11px] sm:text-xs">{m.label}</span>
                  </div>
                  <div
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 tabular-nums text-right ${bCls}`}
                  >
                    <span className="text-xs sm:text-sm">
                      {formatVal(vb, m.pct)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Winner bar (compact + centered) */}
        <div className="rounded-2xl border border-black-800 bg-black-900/70 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <div className="text-[13px] sm:text-sm">
            Categories won —{" "}
            <span className="text-green-400">
              {L.name}: {aWins}
            </span>{" "}
            vs{" "}
            <span className="text-green-400">
              {R.name}: {bWins}
            </span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-black-800" />
          <div className="text-sm sm:text-base font-bold">
            {winner === "Tie" ? "Overall: Tie" : `Overall: ${winner} is better`}
          </div>
        </div>
      </main>

      <footer className="bg-black-900 border-t border-black-800 text-center text-[10px] text-black-400 py-3">
        © {new Date().getFullYear()} Le2KAwards
      </footer>
    </div>
  );
}

function PlayerHeader({ p, side }: { p: PlayerModel; side: "left" | "right" }) {
  return (
    <div
      className={`flex items-center gap-2 ${
        side === "right" ? "justify-end" : ""
      }`}
    >
      {side === "right" ? (
        <>
          <div className="text-right">
            <div className="font-semibold text-sm sm:text-base truncate max-w-[140px]">
              {p.name}
            </div>
            <div className="text-black-300 text-[11px] sm:text-xs truncate">
              @{p.ign}
            </div>
          </div>
          <img
            src={p.pfp}
            alt={p.name}
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-black-700 object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </>
      ) : (
        <>
          <img
            src={p.pfp}
            alt={p.name}
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-black-700 object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div>
            <div className="font-semibold text-sm sm:text-base truncate max-w-[140px]">
              {p.name}
            </div>
            <div className="text-black-300 text-[11px] sm:text-xs truncate">
              @{p.ign}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Picker({
  label,
  value,
  onChange,
  exclude,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  exclude?: string;
}) {
  return (
    <div className="rounded-2xl border border-black-800 bg-black-900/70 p-3">
      <div className="text-[11px] text-black-300 mb-2">{label}</div>
      <select
        className="w-full rounded-lg bg-black-800 border border-black-700 px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {PLAYERS.filter((p) => p.ign !== exclude).map((p) => (
          <option key={p.ign} value={p.ign}>
            {p.name} (@{p.ign})
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm border ${
        active
          ? "border-red-500 text-white bg-red-600/20"
          : "border-black-700 bg-black-800 text-black-200 hover:border-red-500/60"
      }`}
    >
      {children}
    </button>
  );
}

function seasonRow(p: PlayerModel, season: string): GameRow | undefined {
  const rows = (p.stats?.[season] ?? []) as GameRow[];
  return rows[0];
}

function allTime(p: PlayerModel): GameRow | undefined {
  const seasons = Object.keys(p.stats ?? {});
  const entries = seasons.flatMap((s) => p.stats?.[s] ?? []) as GameRow[];
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
  } as Record<Exclude<StatKey, "gp">, number>;
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
}

function compareVals(a: number, b: number, higherBetter: boolean) {
  if (a === b) return 0;
  return higherBetter ? (a > b ? 1 : -1) : a < b ? 1 : -1;
}

function safeGet(row: GameRow | undefined, key: StatKey) {
  return row ? (row[key] as number | undefined) : undefined;
}

function formatVal(v: number | undefined, pct?: boolean) {
  if (v === undefined) return "—";
  if (pct) return `${to2(v)}%`;
  return Number.isInteger(v) ? v : to2(v);
}

function to2(n: number) {
  const val = typeof n === "number" ? n : Number(n);
  return Math.round(val * 100) / 100;
}
