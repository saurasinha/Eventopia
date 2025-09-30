import { Button } from "@eventopia/ui";
import Link from "next/link";

const sections = [
  "Music",
  "Sports",
  "Movies",
  "Standup",
  "Club Gigs",
  "Festivals",
  "Adventure",
];

function Card({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
      <div className="h-28 w-full rounded-md bg-gray-100 dark:bg-gray-800 mb-3" />
      <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">Sample description for the event card.</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen grid grid-rows-[56px_1fr] grid-cols-1 lg:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:block row-span-2 bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-4">
        <h2 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">Sections</h2>
        <nav className="space-y-1">
          {sections.map((s) => (
            <button key={s} className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200">
              {s}
            </button>
          ))}
        </nav>
      </aside>

      {/* Navbar */}
      <header className="col-start-1 lg:col-start-2 h-14 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 px-4 bg-white/70 dark:bg-gray-950/70 backdrop-blur">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="search"
            placeholder="Search events..."
            className="w-full md:w-96 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Link href="/" className="text-sm font-semibold">Eventopia</Link>
      </header>

      {/* Main content */}
      <section className="col-start-1 lg:col-start-2 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} title={`Event ${i + 1}`} />
          ))}
        </div>
      </section>
    </main>
  );
}
