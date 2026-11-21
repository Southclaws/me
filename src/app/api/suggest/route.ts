import { suggest } from "@/graph/compile.ts";

// Nearest real sentences for the 404 page, which can't see the requested path
// on the server.
export function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  const path = q.toLowerCase().replace(/^\/+|\/+$/g, "").slice(0, 200);
  return Response.json({ suggestions: path ? suggest(path) : [] });
}
