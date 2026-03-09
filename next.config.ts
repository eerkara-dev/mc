import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/mc",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
