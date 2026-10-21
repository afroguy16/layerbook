import type { NextConfig } from "next";
// Static export, single page, hash-routed. No query params.
const nextConfig: NextConfig = { output: "export", images: { unoptimized: true } };
export default nextConfig;
