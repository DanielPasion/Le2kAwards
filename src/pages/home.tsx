import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black-950 text-white">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <img
          src="/logo.png"
          alt="Le2KAwards logo"
          className="h-48 w-auto mb-8 drop-shadow-[0_4px_30px_rgba(255,0,0,0.35)]"
        />
        <h1 className="text-4xl font-extrabold mb-4">Le2KAwards</h1>
        <p className="text-lg text-black-300 max-w-xl">
          Welcome to the LeArchive
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-black-900 border-t border-black-800 text-center text-xs text-black-400 py-4">
        © {new Date().getFullYear()} Le2KAwards
      </footer>
    </div>
  );
}
