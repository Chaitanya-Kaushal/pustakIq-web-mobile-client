import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile the workspace TS package (shipped as source, not pre-built).
  transpilePackages: ["@pustakiq/shared"],
  images: {
    // Mock data reuses the Stitch (Google-hosted) demo images.
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
