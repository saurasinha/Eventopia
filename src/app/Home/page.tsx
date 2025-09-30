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
    <div className="rounded-xl border border-sky-900/30 p-4 shadow-lg shadow-black/40 hover:shadow-black/60 transition-shadow bg-gradient-to-b from-black via-sky-950/30 to-black hover:border-sky-700/40">
      <div className="h-36 w-full rounded-lg bg-black mb-3 overflow-hidden relative ring-1 ring-sky-900/30">
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-sky-900/10 to-transparent" />
      </div>
      <h3 className="font-semibold text-sky-100 tracking-wide">{title}</h3>
      <p className="text-xs text-sky-200/90 line-clamp-2 mt-1">{description}</p>
    </div>
  );
}

export default function HomePage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section[]>([]);

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
        if (isMounted){
          setSections(shaped);
          setSelectedSection([shaped[0]]);
        }
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

  const handleSectionClick = (name: string) => {
    setSelectedSection(sections.filter((s) => s.name === name));
    console.log(selectedSection);
  };

  return (
    <main className="min-h-screen grid grid-rows-[64px_1fr] grid-cols-1 lg:grid-cols-[260px_1fr] bg-gradient-to-b from-black via-sky-950/20 to-black text-gray-100">
      <aside className="hidden lg:block row-span-2 bg-black/50 border-r border-sky-900/30 p-6">
        <h2 className="text-xs uppercase tracking-[0.2em] mb-4 bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">Browse Sections</h2>
        <nav className="space-y-2">
          {sections.map((s) => (
            <button key={s.name} onClick={() => handleSectionClick(s.name)} className="w-full text-left px-3 py-2 rounded-md text-sm bg-sky-600/20 hover:bg-sky-600/30 border border-sky-800/40 text-sky-100 transition-colors">
              {s.name}
            </button>
          ))}
        </nav>
      </aside>

      <header className="col-start-1 lg:col-start-2 h-16 border-b border-sky-900/30 flex items-center gap-3 px-6 bg-black/50 supports-[backdrop-filter]:backdrop-blur">
        <div className="flex items-center gap-3 flex-1">
          <input
            type="search"
            placeholder="Search events..."
            className="w-full md:w-96 rounded-md border border-sky-900/40 bg-black/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 text-sky-100 placeholder:text-sky-300/60"
          />
        </div>
        <Link href="/" className="text-lg font-extrabold bg-gradient-to-r from-sky-300 via-sky-400 to-sky-600 bg-clip-text text-transparent tracking-wide">Eventopia</Link>
      </header>

      <section className="col-start-1 lg:col-start-2 p-6">
        {loading ? (
          <div className="text-sm text-sky-300/80">Loading events…</div>
        ) : error ? (
          <div className="text-sm text-red-400">{error}</div>
        ) : sections.length === 0 ? (
          <div className="text-sm text-sky-200/80">No events found.</div>
        ) : (
          <div className="space-y-10">
            {selectedSection.map((section) => (
              <div key={section.name}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-5 w-1 rounded-full bg-gradient-to-b from-sky-400 to-sky-600" />
                  <h3 className="text-base font-semibold text-sky-100 tracking-wide">{section.name}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {section.events.map((evt: EventItem) => (
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
