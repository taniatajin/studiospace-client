import type { Studio } from "@/data/studios";

const API_URL = process.env.API_URL ?? "http://localhost:5000";

export async function getStudios(query = ""): Promise<Studio[]> {
  try {
    const res = await fetch(`${API_URL}/studios${query}`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function getStudio(id: string): Promise<Studio | null> {
  try {
    const res = await fetch(`${API_URL}/studios/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}