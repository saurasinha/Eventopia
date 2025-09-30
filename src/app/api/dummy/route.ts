import { NextRequest } from "next/server";
import { events } from "@/data/dummy";

export function GET(_req: NextRequest) {
  return Response.json({ events });
}


