import type { NextConfig } from "next";

const base = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: base,
  assetPrefix: base ? `${base}/` : "",
  env: { NEXT_PUBLIC_BASE_PATH: base },
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
