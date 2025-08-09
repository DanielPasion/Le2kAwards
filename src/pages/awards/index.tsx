import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

type AwardKey = "mvp" | "opoy" | "dpoy" | "cpoy" | "mip" | "sixth" | "moment";
type Tier = 1 | 2 | 3 | 4;

interface AwardDef {
  key: AwardKey;
  label: string;
  tier: Tier;
}

interface AwardData {
  playerName: string;
  username: string;
  imageUrl?: string;
  votesReceived: number;
  totalVoters: number;
  runnerUpName?: string;
}

const AWARDS: AwardDef[] = [
  { key: "mvp", label: "Most Valuable Player", tier: 1 },
  { key: "opoy", label: "Offensive Player of The Year", tier: 2 },
  { key: "dpoy", label: "Defensive Player of The Year", tier: 2 },
  { key: "cpoy", label: "Clutch Player of The Year", tier: 3 },
  { key: "mip", label: "Most Improved Player", tier: 3 },
  { key: "sixth", label: "6th Man of The Year", tier: 3 },
  { key: "moment", label: "Moment of The Year", tier: 4 },
];

const DATA_2K25: Record<AwardKey, AwardData> = {
  mvp: {
    playerName: "Jared Pasion",
    username: "CxnkleBreakr22",
    imageUrl: "./2k25/awards/mvp.png",
    votesReceived: 6,
    totalVoters: 7,
    runnerUpName: "1 Vote - Jacob Bustamante (LeKINGGG)",
  },
  opoy: {
    playerName: "Justice Howe",
    username: "Howino",
    imageUrl: "./2k25/awards/opoy.png",
    votesReceived: 5,
    totalVoters: 7,
    runnerUpName:
      "1 Vote - Jared Pasion (CxnkleBreakr22) & Kurt Pasion (Sloppenheimerrr)",
  },
  dpoy: {
    playerName: "Jared Pasion",
    username: "CxnkleBreakr22",
    imageUrl: "./2k25/awards/dpoy.png",
    votesReceived: 4,
    totalVoters: 7,
    runnerUpName: "2 Votes - Dylan Pagaduan (temp-4703017)",
  },
  cpoy: {
    playerName: "Shaun Floro",
    username: "LeCreammy",
    imageUrl: "./2k25/awards/cpoy.png",
    votesReceived: 3,
    totalVoters: 7,
    runnerUpName: "3 Votes & Lost Tie Breaker - Jared Pasion (CxnkleBreakr22)",
  },
  mip: {
    playerName: "Dylan Pagaduan",
    username: "temp-4703017",
    imageUrl: "./2k25/awards/mip.png",
    votesReceived: 3,
    totalVoters: 4,
    runnerUpName: "1 Vote - Jacob Bustamante (LeKINGGG)",
  },
  sixth: {
    playerName: "Kurt Pasion",
    username: "Sloppenheimerrr",
    imageUrl: "./2k25/awards/6moy.png",
    votesReceived: 4,
    totalVoters: 7,
    runnerUpName: "2 Votes - Dylan Pagaduan (temp-4703017)",
  },
  moment: {
    playerName: "Jacob Bustamante",
    username: "LeKINGGG",
    imageUrl: "./2k25/awards/moy.png",
    votesReceived: 4,
    totalVoters: 7,
    runnerUpName: "2 Votes - All 5 running out for an open rebound",
  },
};

export default function AwardHistory() {
  const data = DATA_2K25;

  return (
    <div className="min-h-screen flex flex-col bg-black-950 text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <img src="/logo.png" alt="Le2KAwards logo" className="h-8 w-auto" />
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold">
              Award History
            </h1>
            <p className="text-black-300 text-sm">Season: 2K25</p>
          </div>
        </div>
        <TierSection title="MVP" description="Most Valuable Player of NBA2K25">
          <AwardRow
            awards={AWARDS.filter((a) => a.key === "mvp")}
            data={data}
            compactFull
          />
        </TierSection>
        <TierSection
          title="Tier 2"
          description="The best players on each side of the court"
        >
          <AwardRow awards={AWARDS.filter((a) => a.tier === 2)} data={data} />
        </TierSection>
        <TierSection title="Tier 3" description="Key contributors">
          <AwardRow awards={AWARDS.filter((a) => a.tier === 3)} data={data} />
        </TierSection>
        <TierSection
          title="Moment of The Year"
          description="Unforgettable single moment."
        >
          <AwardRow
            awards={AWARDS.filter((a) => a.key === "moment")}
            data={data}
            compactFull
          />
        </TierSection>
      </main>
      <footer className="bg-black-900 border-t border-black-800 text-center text-[10px] text-black-400 py-3">
        © {new Date().getFullYear()} Le2KAwards
      </footer>
    </div>
  );
}

function TierSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <div className="mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
        {description && <p className="text-xs text-black-300">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function AwardRow({
  awards,
  data,
  compactFull = false,
  subLabel,
}: {
  awards: AwardDef[];
  data: Record<AwardKey, AwardData>;
  compactFull?: boolean;
  subLabel?: string;
}) {
  const cols =
    awards.length === 1
      ? "grid-cols-1"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <div className={`grid ${cols} gap-4`}>
      {awards.map((a) => (
        <AwardCard
          key={a.key}
          label={a.label}
          data={data[a.key]}
          compactFull={compactFull && (a.key === "mvp" || a.key === "moment")}
          subLabel={subLabel}
        />
      ))}
    </div>
  );
}

function AwardCard({
  label,
  data,
  compactFull = false,
  subLabel = "Season Winner",
}: {
  label: string;
  data: AwardData;
  compactFull?: boolean;
  subLabel: string | undefined;
}) {
  const [open, setOpen] = useState(false);

  const pct =
    data.totalVoters > 0
      ? Math.min(100, Math.round((data.votesReceived / data.totalVoters) * 100))
      : 0;

  return (
    <div
      className={`rounded-xl border border-black-800 bg-black-900/70 ${
        compactFull ? "p-3" : "p-4"
      }`}
    >
      <div className={compactFull ? "mb-2" : "mb-3"}>
        <h3
          className={
            compactFull ? "text-sm font-semibold" : "text-base font-semibold"
          }
        >
          {label}
        </h3>
        <p className="text-xs text-black-300">{subLabel}</p>
      </div>

      {data.imageUrl ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`w-full ${
            compactFull ? "aspect-[16/5]" : "aspect-[16/9]"
          } rounded-lg border border-black-800 overflow-hidden group cursor-zoom-in`}
          aria-label={`Open full-screen image for ${label}`}
        >
          <img
            src={data.imageUrl}
            alt={`${label} graphic`}
            className="h-full w-full object-contain transition group-hover:scale-[1.01]"
          />
        </button>
      ) : (
        <div
          className={`w-full ${
            compactFull ? "aspect-[16/5]" : "aspect-[16/9]"
          } rounded-lg border border-dashed border-black-700 bg-black-800/60 flex items-center justify-center text-black-400 ${
            compactFull ? "text-[11px]" : "text-xs"
          }`}
        >
          Award Graphic Placeholder
        </div>
      )}

      <div className={compactFull ? "mt-2 space-y-1" : "mt-3 space-y-1"}>
        <div className="text-xs text-black-300">Full Name</div>
        <div className={compactFull ? "text-sm" : "text-sm font-semibold"}>
          {data.playerName}
        </div>

        <div
          className={`text-xs text-black-300 ${compactFull ? "mt-1" : "mt-2"}`}
        >
          In-Game Username
        </div>
        <div className="text-sm">{data.username}</div>
      </div>

      <div className={compactFull ? "mt-2" : "mt-3"}>
        <div className="flex items-center justify-between text-xs">
          <span className="text-black-300">Votes</span>
          <span className="font-semibold">
            {data.votesReceived} / {data.totalVoters}
          </span>
        </div>
        <div
          className={`${
            compactFull ? "mt-1 h-1" : "mt-1.5 h-1.5"
          } w-full rounded-full bg-black-800 overflow-hidden`}
        >
          <div
            className="h-full bg-red-600"
            style={{ width: `${pct}%` }}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            role="progressbar"
          />
        </div>
      </div>

      {data.runnerUpName && (
        <div className="mt-2 text-[11px] text-black-400">
          Runner-up: {data.runnerUpName}
        </div>
      )}

      {data.imageUrl && (
        <ImageModal
          open={open}
          onClose={() => setOpen(false)}
          src={data.imageUrl}
          alt={`${label} graphic full-screen`}
        />
      )}
    </div>
  );
}

function ImageModal({
  open,
  onClose,
  src,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-900/80"
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen image viewer"
      onClick={onClose}
    >
      <div className="relative mx-4" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close full-screen image"
          className="absolute -top-5 right-0 rounded-full bg-black-800/80 px-3 py-1 text-white text-sm border border-black-700 hover:bg-black-700"
        >
          ✕
        </button>
        <img
          src={src}
          alt={alt}
          className="max-h-[90vh] max-w-[90vw] rounded-xl border border-black-700 object-contain"
        />
      </div>
    </div>
  );
}
