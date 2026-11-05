// Browser theke server call. 401 ashle ekbar token refresh kore retry kore
export async function apiFetch(path: string, options: RequestInit = {}) {
  const run = () =>
    fetch(`/server${path}`, {
      ...options,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    });

  let res = await run();
  if (res.status === 401) {
    const sync = await fetch("/api/jwt", { method: "POST" });
    if (sync.ok) res = await run();
  }
  return res;
}