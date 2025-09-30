"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabaseClient";

type EventItem = {
  id: string | number;
  title: string;
  description: string;
  image: string | null;
};

type Section = {
  name: string;
  events: EventItem[];
};

function Card({ event }: { event: EventItem }) {
  const title = event.title ?? "Untitled Event";
  const description = event.description ?? "No description available.";
  const imageUrl = event.image ?? "/globe.svg";
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
      <div className="h-28 w-full rounded-md bg-gray-100 dark:bg-gray-800 mb-3 overflow-hidden flex items-center justify-center">
        
      </div>
      <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{description}</p>
    </div>
  );
}

export default function HomePage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const url = `${supabaseUrl}/rest/v1/events?select=id,category_name,events&order=category_name.asc`;
        const res = await fetch(url, {
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        const rows = (await res.json()) as any[];
        const shaped: Section[] = rows.map((row: any) => ({
          name: row.category_name ?? "Untitled",
          events: Array.isArray(row.events)
            ? row.events.map((evt: any) => ({
                id: evt.id,
                title: evt.title ?? "Untitled Event",
                description: evt.description ?? evt.decription ?? "",
                image: evt.image ?? null,
              }))
            : [],
        }));
        if (isMounted) setSections(shaped);
      } catch (err: any) {
        if (isMounted) setError(err?.message ?? "Failed to load events");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <main className="min-h-screen grid grid-rows-[56px_1fr] grid-cols-1 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block row-span-2 bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-4">
        <h2 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">Sections</h2>
        <nav className="space-y-1">
          {sections.map((s) => (
            <button key={s.name} className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200">
              {s.name}
            </button>
          ))}
        </nav>
      </aside>

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

      <section className="col-start-1 lg:col-start-2 p-4">
        {loading ? (
          <div className="text-sm text-gray-600 dark:text-gray-300">Loading events…</div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : sections.length === 0 ? (
          <div className="text-sm text-gray-600 dark:text-gray-300">No events found.</div>
        ) : (
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.name}>
                <h3 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100">{section.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {section.events.map((evt) => (
                    <Card key={evt.id} event={evt} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
