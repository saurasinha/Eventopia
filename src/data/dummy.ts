export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO 8601 string
  location: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
};

export const events: EventItem[] = [
  {
    id: "evt_001",
    title: "Community Hack Night",
    date: "2025-10-15T18:00:00.000Z",
    location: "Downtown Innovation Hub",
    description: "An evening of collaborative coding, mentorship, and pizza.",
    imageUrl: "/globe.svg",
    tags: ["coding", "community", "meetup"],
  },
  {
    id: "evt_002",
    title: "Design Systems Workshop",
    date: "2025-11-02T16:30:00.000Z",
    location: "Eventopia Campus, Building B",
    description: "Hands-on workshop on building accessible and scalable design systems.",
    imageUrl: "/window.svg",
    tags: ["design", "accessibility", "frontend"],
  },
  {
    id: "evt_003",
    title: "Next.js Performance Deep Dive",
    date: "2025-12-05T17:00:00.000Z",
    location: "Online Webinar",
    description: "Explore advanced performance techniques in Next.js with live demos.",
    imageUrl: "/next.svg",
    tags: ["nextjs", "performance", "web"],
  },
];


