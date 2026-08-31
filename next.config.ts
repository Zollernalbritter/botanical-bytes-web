import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Schlanker Node-Server fuer das Docker-Image (Coolify).
  output: "standalone",
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/de",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
