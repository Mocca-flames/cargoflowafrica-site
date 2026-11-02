import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "cargoflowafrica-site";
const base = isProd ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: base,
  assetPrefix: isProd ? `${base}/` : "",
  env: { NEXT_PUBLIC_BASE_PATH: base },
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
