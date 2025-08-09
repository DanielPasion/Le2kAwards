// src/pages/MeetDeveloper.tsx
import Navbar from "../components/Navbar";

export default function MeetDeveloper() {
  return (
    <div className="min-h-screen flex flex-col bg-black-950 text-white">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
        <header className="relative flex items-center justify-center">
          <div className="absolute left-0">
            <img src="/logo.png" alt="Le2KAwards logo" className="h-8 w-auto" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold relative">
            Meet the Developer
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600" />
          </h1>
        </header>

        {/* Hero card */}
        <section className="rounded-2xl border border-black-800 bg-black-900/70 p-4 sm:p-5 flex flex-col items-center gap-4">
          <img
            src="/dev.png" // your single portrait
            alt="Developer headshot"
            className="h-40 w-40 rounded-2xl border border-black-700 object-contain bg-black-800/60"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="text-center">
            <h2 className="text-xl font-bold">Daniel Pasion</h2>
            <p className="mt-3 text-sm text-black-200 max-w-2xl">
              Made this so we can keep track of our 2k stats all time
            </p>
          </div>
        </section>

        {/* Stack */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Stack">
            <Tag>React (Vite)</Tag>
            <Tag>TypeScript</Tag>
            <Tag>Tailwind v4 (themes)</Tag>
            <Tag>React Router</Tag>
          </Card>
        </section>

        {/* Links / contact */}
        <section className="rounded-2xl border border-black-800 bg-black-900/70 p-4 sm:p-5">
          <h3 className="text-lg font-bold mb-3">Links</h3>
          <div className="flex flex-wrap gap-2">
            <A href="https://github.com/DanielPasion" label="GitHub" />
            <A href="mailto:dnpaxion@gmail.com" label="Email" />
          </div>
        </section>
      </main>

      <footer className="bg-black-900 border-t border-black-800 text-center text-[10px] text-black-400 py-3">
        © {new Date().getFullYear()} Le2KAwards
      </footer>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black-800 bg-black-900/70 p-4 sm:p-5">
      <h3 className="text-base font-bold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2 text-sm">{children}</div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 rounded-lg border border-black-700 bg-black-800/60">
      {children}
    </span>
  );
}

function A({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="px-3 py-2 rounded-lg border border-black-700 bg-black-800/60 hover:border-red-500/60 hover:text-red-400 transition text-sm"
    >
      {label}
    </a>
  );
}
