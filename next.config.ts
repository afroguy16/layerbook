import type { NextConfig } from "next";
// App Router, server actions enabled (pilot intake posts through /app/actions/submit-intake).
// Pages without dynamic APIs still prerender at build.
const nextConfig: NextConfig = { images: { unoptimized: true } };
export default nextConfig;
