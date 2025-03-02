import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    "@telekom/scale-components-react",
    "@telekom/scale-components"
  ],
};

export default nextConfig;
