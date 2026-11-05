// Central place for the backend API base URL.
// Strips trailing slashes so `${API_URL}/path` can never produce "//path",
// which makes Vercel answer with a 308 redirect that breaks CORS preflights.
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
  /\/+$/,
  "",
);
